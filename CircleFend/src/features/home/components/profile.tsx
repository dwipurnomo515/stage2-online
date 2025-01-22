import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaComment, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { UserEntity } from "../../../entities/user";
import { apiV1 } from "../../../libs/api";
import Cookies from "js-cookie";
import { useAppSelector } from "../../../hooks/use-store";
import LikeButtonThread from "../button/like";
import { useUser } from "../hooks/use-user";

// Komponen untuk Postingan

const MediaGallery = ({
  images,
  onImageClick,
}: {
  images: { id: number; url: string }[];
  onImageClick: (url: string) => void;
}) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
    {images.map(({ id, url }) => (
      <Box
        key={id}
        borderRadius="md"
        overflow="hidden"
        mt={2}
        onClick={() => onImageClick(url)} // Tambahkan event handler saat gambar diklik
        cursor="pointer" // Ubah kursor menjadi pointer untuk indikasi klik
      >
        <Image src={url} alt={`Media ${id}`} boxSize="100%" objectFit="cover" />
      </Box>
    ))}
  </SimpleGrid>
);

export function ProfilePage() {
  const [profile, setProfile] = useState<UserEntity | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors, isSubmitting, onSubmit, data } =
    useUser();
  const userId = useAppSelector((state) => state.auth.id);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiV1.get("/getUser", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.log("Error fetching profile", error);
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId]);
  console.log(profile);
  console.log("ini threads", profile?.threads);

  if (!profile) return <Spinner />;

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set gambar yang dipilih
    onImageOpen(); // Buka modal gambar
  };

  // Update profil state dari modal
  const handleSave = () => {
    onClose();
  };
  const mediaThreads = profile?.threads.filter((thread) => thread.image);

  return (
    <Box p={4} maxW="800px" mx="auto" color="white">
      {/* Nama Pengguna */}
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          {profile.fullName}
        </Text>

        {/* Kartu Profil Pengguna */}
        <Box
          mb={6}
          p={3} // Mengurangi padding
          borderRadius="md"
          // Background color untuk profil card
          color="white"
          position="relative"
          overflow="hidden" // Mengatur overflow untuk menutupi bagian avatar yang keluar dari card
        >
          {/* Background Image */}
          <Box
            w={"570px"}
            h="100px" // Mengecilkan ukuran background image
            borderRadius="md"
            backgroundImage={profile.backgroundImage}
            backgroundSize="cover"
            backgroundPosition="center"
            position="relative"
            mb={8} // Mengurangi jarak antara gambar latar belakang dan konten berikutnya
          >
            {/* Profile Picture */}
            <Box
              position="absolute"
              bottom={-15} // Menempatkan avatar lebih tinggi
              left={3} // Mengurangi jarak dari kiri
              transform="translateY(50%)" // Mengatur posisi avatar agar berada setengah di luar gambar
            >
              <Avatar
                size="xl" // Mengurangi ukuran avatar
                name="User Name"
                src={profile.profileImage}
                border="2px solid white"
                borderRadius="full"
                mb={5}
              />
            </Box>
          </Box>
          {/* Edit Profile Button */}
          <HStack spacing={3} mt={3} justify="flex-end">
            {" "}
            {/* Mengurangi jarak dan padding */}
            <Button
              colorScheme="green"
              size="sm"
              variant="outline"
              borderColor="white"
              color="white"
              borderRadius="full"
              _hover={{ borderColor: "green.400", color: "green.400" }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </HStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xl" fontWeight="bold">
              {profile.userName}
            </Text>
            <Text fontSize={"sm"} color={"#909090"}>
              {profile.email}
            </Text>
            <Text fontSize="sm" color="gray.200">
              {profile.bio}
            </Text>
            <HStack spacing={3}>
              {" "}
              {/* Mengurangi jarak antara elemen */}
              <HStack spacing={1}>
                <Text fontSize="sm" fontWeight="bold" color="white">
                  {profile.following}
                </Text>
                <Text fontSize="sm" color="#909090">
                  Following
                </Text>
              </HStack>
              <HStack spacing={1}>
                <Text fontSize="sm" fontWeight="bold" color="white">
                  {profile.followers}
                </Text>
                <Text fontSize="sm" color="#909090">
                  Followers
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        <Divider my={4} />

        {/* Tabs */}
        <Box w="full" display="flex" flexDirection={"column"}>
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab
                flex={1}
                _selected={{ borderBottom: "6px solid green", color: "white" }}
              >
                All Posts
              </Tab>
              <Tab
                flex={1}
                _selected={{ borderBottom: "6px solid green", color: "white" }}
              >
                Media
              </Tab>
            </TabList>
            <TabPanels display={"flex"} flexDirection={"row"}>
              <TabPanel p={0} flex="1">
                {profile.threads.map((post) => (
                  <Box p={4} borderRadius="md" mb={4} bg="black" color="white">
                    <HStack spacing={3} mb={3}>
                      <Avatar
                        size="sm"
                        name={post.user.userName}
                        src={post.user.profileImage}
                      />
                      <Text fontWeight="bold">{post.user.userName}</Text>
                      <Text fontSize={"small"} color={"grey"}>
                        {" "}
                        {post.user.email}
                      </Text>
                      <Text fontSize={"small"} color={"grey"}>
                        4h
                      </Text>
                    </HStack>

                    <Text fontSize={"md"} color={"white"} mt={2}>
                      {" "}
                      {post.content}
                    </Text>

                    <Image
                      src={post.image}
                      borderRadius="md"
                      mt={3}
                      onClick={() => handleImageClick(post.image)} // Klik untuk menampilkan modal
                      cursor="pointer"
                    />
                    <HStack spacing={4} mt={2}>
                      <LikeButtonThread threadId={post.id} />
                      <Text fontSize="sm" color="gray.300" ml={-4}>
                        {post.likesCount}
                      </Text>
                      <HStack spacing={1} align="center">
                        <IconButton
                          size="sm"
                          color="grey"
                          background={"transparant"}
                          aria-label="Comment"
                          icon={<FaComment />}
                        />
                        <Text fontSize="sm" color="gray.300" ml={-1}>
                          {post.repliesCount} Replies
                        </Text>
                      </HStack>
                    </HStack>
                    <Divider my={4} />
                  </Box>
                ))}
              </TabPanel>
              <TabPanel p={0} flex="1">
                {mediaThreads && mediaThreads.length > 0 ? (
                  <MediaGallery
                    images={mediaThreads.map((thread) => ({
                      id: thread.id,
                      url: thread.image,
                    }))}
                    onImageClick={handleImageClick} // Teruskan fungsi handleImageClick
                  />
                ) : (
                  <Text>No media to display</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
      {/* Modal Edit Profile */}
      {/* Modal Edit Profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1c1c1c" color="white">
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <form
              id="edit-profile-form"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <FormControl isInvalid={!!errors.fullName} mb={4}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Full Name"
                  defaultValue={data?.fullName}
                  {...register("fullName")}
                  bg="#333"
                  border="none"
                  color="white"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.userName} mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Username"
                  defaultValue={data?.userName}
                  {...register("userName")}
                  bg="#333"
                  border="none"
                  color="white"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.bio} mb={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Tell us about yourself"
                  defaultValue={data?.bio}
                  {...register("bio")}
                  bg="#333"
                  border="none"
                  color="white"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.profileImage} mb={4}>
                <FormLabel>Profile Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("profileImage")}
                  bg="#333"
                  color="white"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.backgroundImage} mb={4}>
                <FormLabel>Background Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("backgroundImage")}
                  bg="#333"
                  color="white"
                />
              </FormControl>
              <Button
                bg="#00c853"
                color="white"
                fontWeight="bold"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
                form="edit-profile-form"
              >
                Save Changes
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal untuk menampilkan gambar detail */}
      {/* Modal untuk menampilkan gambar detail */}
      <Modal isOpen={isImageOpen} onClose={onImageClose} size="full">
        {" "}
        {/* Ubah ukuran modal menjadi full */}
        <ModalOverlay />
        <ModalContent bg="black" p={0} color="white">
          {" "}
          {/* Background hitam dan padding diatur ke 0 */}
          <ModalCloseButton color="white" />{" "}
          {/* Tutup modal dengan tombol warna putih */}
          <ModalBody p={0}>
            {" "}
            {/* Hilangkan padding pada body modal */}
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected Image"
                objectFit="contain" // Agar gambar tetap proporsional saat di-fullscreen
                w="full" // Lebar penuh
                h="100vh" // Tinggi penuh mengikuti layar
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
