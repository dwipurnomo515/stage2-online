// src/components/ProfilePage.tsx

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
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import profileBackground from '../../../assets/a.jpg'; // Pastikan path ini benar
import { FaComment, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
const posts = [
    {
        id: 1,
        username: 'Jane Doe',
        imageUrl: '',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        avatarUrl: 'https://bit.ly/2TKx8Gv'
    },
    {
        id: 2,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 3,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 4,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 5,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    // Tambahkan lebih banyak postingan sesuai kebutuhan
];

interface Profile {
    name: string;
    username: string;
    bio: string;
}
// Komponen untuk Postingan
const Post = ({ username, imageUrl, text, avatarUrl }: { username: string, imageUrl: string, text: string, avatarUrl: string }) => (
    <Box
        p={4}
        borderRadius="md"
        mb={4}
        bg="black"
        color="white"
    >
        <HStack spacing={3} mb={3}>
            <Avatar size="sm" name={username} src={avatarUrl} />
            <Text fontWeight="bold">{username}</Text>
            <Text fontSize={'small'} color={'grey'}> @{username}</Text>
            <Text fontSize={'small'} color={'grey'}>4h</Text>
        </HStack>

        <Text mb={2}>{text}</Text>

        <Image
            src={imageUrl}
            borderRadius="md"
            mt={3}
        />
        <HStack spacing={4} mt={2}>
            <IconButton size="sm" color="grey" background={'transparant'} aria-label="Like" icon={<FaHeart />} />
            <Text fontSize="sm" color="gray.300" ml={-4}>300</Text>
            <HStack spacing={1} align="center">
                <IconButton size="sm" color="grey" background={'transparant'} aria-label="Comment" icon={<FaComment />} />
                <Text fontSize="sm" color="gray.300" ml={-1}>300 Replies</Text>
            </HStack>
        </HStack>
        <Divider my={4} />
    </Box>
);

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

export function ProfilePage() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const mediaImages = posts
        .filter(post => post.imageUrl) // Hanya ambil yang memiliki imageUrl
        .map(post => ({ id: post.id, url: post.imageUrl })); // Tambahkan ID ke gambar
    const [profile, setProfile] = useState<Profile>({
        name: 'Dwi Purnomo',
        username: 'DwiPurnomo',
        bio: 'picked over by the worms, and weird fishes'
    });
    // Modal state
    const [modalProfile, setModalProfile] = useState<Profile>(profile);

    // Update profil state dari modal
    const handleSave = () => {
        setProfile(modalProfile);
        onClose();
    };

    return (
        <Box p={4} maxW="800px" mx="auto" color="white" >
            {/* Nama Pengguna */}
            < VStack spacing={4} align="start" >
                <Text fontSize="2xl" fontWeight="bold">John Doe</Text>

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
                        backgroundImage={`url(${profileBackground})`}
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
                                src="https://bit.ly/dan-abramov"
                                border="2px solid white"
                                borderRadius="full"
                                mb={5}
                            />
                        </Box >
                    </Box >
                    {/* Edit Profile Button */}
                    < HStack spacing={3} mt={3} justify="flex-end" > {/* Mengurangi jarak dan padding */}
                        < Button
                            colorScheme="green"
                            size="sm"
                            variant="outline"
                            borderColor="white"
                            color="white"
                            borderRadius="full"
                            _hover={{ borderColor: 'green.400', color: 'green.400' }}
                            onClick={() => {
                                setModalProfile(profile); // Set modal state untuk mencocokkan profil state
                                onOpen();
                            }}
                        >
                            Edit Profile
                        </Button >
                    </HStack >
                    <VStack align="start" spacing={1}>
                        <Text fontSize="xl" fontWeight="bold">{profile.name}</Text>
                        <Text fontSize={'sm'} color={'#909090'}>{profile.username}@gmail.com</Text>
                        <Text fontSize="sm" color="gray.200">{profile.bio}</Text>
                        <HStack spacing={3}> {/* Mengurangi jarak antara elemen */}
                            <HStack spacing={1}>
                                <Text fontSize="sm" fontWeight="bold" color="white">123</Text>
                                <Text fontSize="sm" color="#909090">Following</Text>
                            </HStack>
                            <HStack spacing={1}>
                                <Text fontSize="sm" fontWeight="bold" color="white">456</Text>
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
                                {posts.map(post => (
                                    <Post
                                        key={post.id}
                                        username={post.username}
                                        imageUrl={post.imageUrl}
                                        text={post.text}
                                        avatarUrl={post.avatarUrl}
                                    />
                                ))}
                            </TabPanel>
                            <TabPanel p={0} flex="1">
                                {mediaImages.length > 0 ? (

                                    <MediaGallery images={mediaImages} />
                                ) : (
                                    <Text>No media available.</Text>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </VStack >
            {/* Modal Edit Profile */}
            {/* Modal Edit Profile */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent background={'black'} color={'white'}>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="name" mb={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={modalProfile.name}
                                onChange={(e) => setModalProfile({ ...modalProfile, name: e.target.value })}
                                placeholder="Enter your name"
                            />
                        </FormControl>
                        <FormControl id="username" mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                value={modalProfile.username}
                                onChange={(e) => setModalProfile({ ...modalProfile, username: e.target.value })}
                                placeholder="Enter your username"
                            />
                        </FormControl>
                        <FormControl id="bio">
                            <FormLabel>Bio</FormLabel>
                            <Input
                                value={modalProfile.bio}
                                onChange={(e) => setModalProfile({ ...modalProfile, bio: e.target.value })}
                                placeholder="Enter your bio"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    );
}
