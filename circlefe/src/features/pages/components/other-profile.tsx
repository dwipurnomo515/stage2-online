import {
    Avatar,
    Box,
    Button,
    Divider,
    HStack,
    IconButton,
    Image,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import profileBackground from '../../../assets/a.jpg'; // Pastikan path ini benar
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const posts = [
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

    // Tambahkan lebih banyak postingan sesuai kebutuhan
];

interface Profile {
    name: string;
    username: string;
    bio: string;
}

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
            <IconButton size="sm" color="grey" background={'transparent'} aria-label="Like" icon={<FaHeart />} />
            <Text fontSize="sm" color="gray.300" ml={-4}>300</Text>
            <HStack spacing={1} align="center">
                <IconButton size="sm" color="grey" background={'transparent'} aria-label="Comment" icon={<FaComment />} />
                <Text fontSize="sm" color="gray.300" ml={-1}>300 Replies</Text>
            </HStack>
        </HStack>
        <Divider my={4} />
    </Box>
);

const MediaGallery = ({ images }: { images: { id: number, url: string }[] }) => {
    const navigate = useNavigate();

    const handleImageClick = (id: number) => {
        navigate(`/detail-image/${id}`);
    };

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {images.map(({ id, url }) => (
                <Box
                    key={id}
                    borderRadius="md"
                    overflow="hidden"
                    mt={2}
                    onClick={() => handleImageClick(id)}
                    cursor="pointer"
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
};

export function OtherProfilePage() {
    const mediaImages = posts
        .filter(post => post.imageUrl) // Hanya ambil yang memiliki imageUrl
        .map(post => ({ id: post.id, url: post.imageUrl })); // Tambahkan ID ke gambar
    const [profile, setProfile] = useState<Profile>({
        name: 'Dwi Purnomo',
        username: 'DwiPurnomo',
        bio: 'picked over by the worms, and weird fishes'
    });

    return (
        <Box p={4} maxW="800px" mx="auto" color="white" >
            <VStack spacing={4} align="start" >
                <HStack mb={4} spacing={4}>
                    <Link to={'/'}>
                        <IconButton icon={<ArrowBackIcon />} background={'transparent'} color={'white'} fontSize={'20px'} aria-label="Back" />
                    </Link>
                    <Text fontSize="2xl" fontWeight="bold" ml={-4}>{profile.name}</Text>
                </HStack>
                <Box
                    mb={6}
                    p={3}
                    borderRadius="md"
                    color="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Box
                        w={'650px'}
                        h="100px"
                        borderRadius="md"
                        backgroundImage={`url(${profileBackground})`}
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
                                size="xl"
                                name="User Name"
                                src="https://bit.ly/dan-abramov"
                                border="2px solid white"
                                borderRadius="full"
                                mb={5}
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
                            _hover={{ borderColor: 'green.400', color: 'green.400' }}
                        >
                            Follow
                        </Button>
                    </HStack>
                    <VStack align="start" spacing={1}>
                        <Text fontSize="xl" fontWeight="bold">{profile.name}</Text>
                        <Text fontSize={'sm'} color={'#909090'}>{profile.username}@gmail.com</Text>
                        <Text fontSize="sm" color="gray.200">{profile.bio}</Text>
                        <HStack spacing={3}>
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
                </Box>

                <Divider my={4} />

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
            </VStack>
        </Box>
    );
}
