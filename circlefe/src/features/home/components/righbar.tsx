import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { useUser } from "../hooks/use-user";
import { SuggestedUser } from "../types/suggested";
import FollowButton from "../button/follow";
import { ButtonLink } from "../button/link";

export function Rightbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors, isSubmitting, onSubmit, data } =
    useUser();
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await apiV1.get<SuggestedUser[]>("/users/suggested");
        if (response.status === 200) {
          setSuggestedUsers(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  return (
    <Box w="350px" bg="black" boxShadow="md" borderRadius="md">
      {/* Profil Section */}
      <Box
        mb={6}
        p={3}
        borderRadius="md"
        border="1px solid black"
        bg="#262626"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Text fontSize="md" fontWeight="bold" color="white" mb={3}>
          My Profile
        </Text>
        <Box
          h="80px"
          borderRadius="md"
          backgroundImage={`url(${
            data?.backgroundImage
              ? data.backgroundImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6NDHg9mchz3F2t9twjoWlZj9onZdfUdwjCw&s"
          })`}
          backgroundSize="cover"
          backgroundPosition="center"
          position="relative"
          mb={8}
        >
          <Box
            position="absolute"
            bottom={-15}
            left={3}
            transform="translateY(50%)"
          >
            <Avatar
              size="lg"
              name={"fullName"}
              src={data?.profileImage}
              border="2px solid white"
              borderRadius="full"
            />
          </Box>
        </Box>
        <HStack spacing={3} mt={3} justify="flex-end">
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
            {data?.fullName}
          </Text>
          <Text fontSize={"sm"} color={"#909090"}>
            {data?.userName}
          </Text>
          <Text fontSize="sm" color="gray.200">
            {data?.bio ? data.bio : "Bio belum diisi"}
          </Text>
          <HStack spacing={3}>
            <HStack spacing={1}>
              <Text fontSize="sm" fontWeight="bold" color="white">
                {data?.following}
              </Text>
              <Text fontSize="sm" color="#909090">
                Following
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text fontSize="sm" fontWeight="bold" color="white">
                {data?.followers}
              </Text>
              <Text fontSize="sm" color="#909090">
                Followers
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>

      {/* Modal for Editing Profile */}
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

      {/* Suggested Users Section */}
      <Box
        p={4}
        borderRadius="md"
        border="1px solid black"
        bg="#262626"
        color="white"
        mb={6}
      >
        <Text fontSize="lg" fontWeight="bold">
          Suggested for You
        </Text>
        <VStack spacing={1} align="stretch">
          {Array.isArray(suggestedUsers) &&
            suggestedUsers.map((user) => (
              <Box
                key={user.id}
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                bg="transparent"
              >
                <Avatar
                  size="sm"
                  name={user.fullName}
                  src={user.profileImage || ""}
                  mr={3}
                />
                <VStack spacing={1} align="start" flex="1">
                  <ButtonLink
                    textDecoration={"none"}
                    state={user.id}
                    to={`/otherProfile/${user.id}`}
                    bg={"none"}
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {user.fullName}
                    </Text>
                  </ButtonLink>
                  <Text fontSize="xs" color="gray.400">
                    {user.email}
                  </Text>
                </VStack>
                <Box bg={"none"}>
                  <FollowButton userId={user.id} />
                </Box>
              </Box>
            ))}
        </VStack>
      </Box>

      {/* Footer Section */}
      <Box
        p={1}
        borderRadius="sm"
        border="1px solid black"
        bg="#262626"
        color="white"
        fontSize="sm"
        textAlign="center"
      >
        <Text>Developed By DWI PURNOMO</Text>
        <Text> Powered by Dumbways Indonesia</Text>
      </Box>
    </Box>
  );
}
