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
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { FaComment, } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { UserEntity } from '../../../entities/user';
import { apiV1 } from '../../../libs/api';
import Cookies from 'js-cookie';
import LikeButtonThread from '../button/like';
import { useParams } from 'react-router-dom';
import FollowButton from '../button/follow';


// Komponen untuk Postingan


const MediaGallery = ({ images }: { images: { id: number, url: string }[] }) => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {images.map(({ id, url }) => (
            <Box
                key={id}
                borderRadius="md"
                overflow="hidden"
                mt={2}
            >
                <Image
                    src={url}
                    alt={`Media ${id}`}
                    boxSize="100%"
                    objectFit="cover"
                />
            </Box>
        ))}
    </SimpleGrid>
);

export function OtherProfilePage() {
    const [profile, setProfile] = useState<UserEntity | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiV1.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });
                setProfile(response.data)
                console.log("ini response", response.data);

            } catch (error) {
                console.log("Error fetching profile", error);

            }
        };
        if (id) {
            fetchProfile();
        }
    }, [id]);
    console.log(profile);
    console.log("ini threads", profile?.threads);



    if (!profile) return <Spinner />;


    // Update profil state dari modal
    const handleSave = () => {
        onClose();
    };
    const mediaThreads = profile?.threads ? profile.threads.filter(thread => thread.image) : [];

    return (
        <Box p={4} maxW="800px" mx="auto" color="white" >
            {/* Nama Pengguna */}
            < VStack spacing={4} align="start" >
                <Text fontSize="2xl" fontWeight="bold">{profile.fullName}</Text>

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
                    < Box
                        w={'650px'}
                        h="100px" // Mengecilkan ukuran background image
                        borderRadius="md"
                        backgroundImage={profile.backgroundImage || 'url("/default-background.jpg")'} // Fallback untuk background image
                        backgroundSize="cover"
                        backgroundPosition="center"
                        position="relative"
                        mb={8} // Mengurangi jarak antara gambar latar belakang dan konten berikutnya
                    >
                        {/* Profile Picture */}
                        < Box
                            position="absolute"
                            bottom={- 15} // Menempatkan avatar lebih tinggi
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
                        </Box >
                    </Box >
                    {/* Edit Profile Button */}
                    < HStack spacing={3} mt={3} justify="flex-end" > {/* Mengurangi jarak dan padding */}
                        <FollowButton userId={profile.id} />

                    </HStack >
                    <VStack align="start" spacing={1}>
                        <Text fontSize="xl" fontWeight="bold">{profile.userName || "Anonymous"}</Text> {/* Fallback untuk username */}
                        <Text fontSize={'sm'} color={'#909090'}>{profile.email}</Text>
                        <Text fontSize="sm" color="gray.200">{profile.bio || "No bio available"}</Text> {/* Fallback untuk bio */}
                        <HStack spacing={3}>
                            <HStack spacing={1}>
                                <Text fontSize="sm" fontWeight="bold" color="white">
                                    {Array.isArray(profile.following) ? profile.following.length : 0}
                                </Text>
                                <Text fontSize="sm" color="#909090">Following</Text>
                            </HStack>
                            <HStack spacing={1}>
                                <Text fontSize="sm" fontWeight="bold" color="white">
                                    {Array.isArray(profile.followers) ? profile.followers.length : 0}
                                </Text>
                                <Text fontSize="sm" color="#909090">Followers</Text>
                            </HStack>
                        </HStack>

                    </VStack>
                </Box >

                <Divider my={4} />

                {/* Tabs */}
                <Box w="full" display="flex" flexDirection={'column'}>
                    <Tabs variant="enclosed" colorScheme="teal" >
                        <TabList>
                            <Tab
                                flex={1}
                                _selected={{ borderBottom: '6px solid green', color: 'white' }}
                            >
                                All Posts
                            </Tab>
                            <Tab
                                flex={1}
                                _selected={{ borderBottom: '6px solid green', color: 'white' }}
                            >
                                Media
                            </Tab>
                        </TabList>
                        <TabPanels display={'flex'} flexDirection={'row'}>
                            <TabPanel p={0} flex="1">
                                {profile.threads?.map(post => (
                                    <Box
                                        p={4}
                                        borderRadius="md"
                                        mb={4}
                                        bg="black"
                                        color="white"
                                    >
                                        <HStack spacing={3} mb={3}>
                                            <Avatar size="sm" name={profile.userName} src={profile.profileImage} />
                                            <Text fontWeight="bold">{profile.userName}</Text>
                                            <Text fontSize={'small'} color={'grey'}> {profile.email}</Text>
                                            <Text fontSize={'small'} color={'grey'}>4h</Text>
                                        </HStack>


                                        <Image
                                            src={post.image}
                                            borderRadius="md"
                                            mt={3}
                                        />
                                        <HStack spacing={4} mt={2}>
                                            <LikeButtonThread threadId={post.id} />
                                            console.log("ini teh id thread", post.id);

                                            <Text fontSize="sm" color="gray.300" ml={-4}>{post.likesCount}</Text>
                                            <HStack spacing={1} align="center">
                                                <IconButton size="sm" color="grey" background={'transparant'} aria-label="Comment" icon={<FaComment />} />
                                                <Text fontSize="sm" color="gray.300" ml={-1}>{post.repliesCount} Replies</Text>
                                            </HStack>
                                        </HStack>
                                        <Divider my={4} />
                                    </Box>
                                ))}
                            </TabPanel>
                            <TabPanel p={0} flex="1">
                                {mediaThreads && mediaThreads.length > 0 ? (
                                    <MediaGallery images={mediaThreads.map(thread => ({ id: thread.id, url: thread.image }))} />
                                ) : (
                                    <Text>No media to display</Text>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </VStack >

        </Box >
    );
}