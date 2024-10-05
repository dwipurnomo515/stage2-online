import {
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    HStack,
    IconButton,
    Image,
    Input, // Import Avatar component
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import { FaComment, FaHeart, FaImage } from "react-icons/fa";
import { useHome } from "../hooks/use-home";
import { Link } from "react-router-dom";

export function Home() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data,
        previewImage,
        handleImageChange,
        handleToggleLike,
    } = useHome();

    return (
        <Box
            p={4}
            bgColor="black"
            color="white"
            maxWidth="800px" // Menyesuaikan lebar konten halaman
            mx="auto" // Centering konten di halaman
        >
            <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                mb={4}
            >
                Home
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.content} >
                    <HStack spacing={4}>
                        <Avatar size="md" name="User" src="https://bit.ly/dan-abramov" />
                        <VStack align="start" flex="1">
                            <InputGroup>
                                <Input
                                    placeholder="What's on your mind?"
                                    bg="black"
                                    color="white"
                                    borderRadius="md"
                                    border={'1px grey solid'}
                                    pr="120px" // Space for icon and button
                                    {...register("content")}
                                />

                                <InputRightElement>
                                    <HStack spacing={2} ml={-20}>
                                        <IconButton
                                            as="label"
                                            htmlFor="image-upload"
                                            aria-label="Upload Image"
                                            icon={<FaImage />}
                                            color="white"
                                            bg="transparent"
                                            size="md"
                                            borderRadius="md"
                                            _hover={{ bg: 'grey' }}

                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image-upload"
                                            style={{ display: 'none' }}
                                            {...register("image")}
                                            onChange={handleImageChange}



                                        />
                                        <Button
                                            bg="brand.main"
                                            color="white"
                                            p={3}
                                            isLoading={isSubmitting}
                                            size="sm"
                                            borderRadius="full"
                                            type="submit"
                                            _hover={{ bg: 'green.400' }}
                                        >
                                            Post
                                        </Button>
                                    </HStack>
                                </InputRightElement>
                            </InputGroup>
                        </VStack>
                    </HStack>
                    <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                </FormControl>


            </form>
            {previewImage && (
                <Box mt={4} textAlign="center">
                    <Image
                        src={previewImage}
                        alt="Selected"
                        borderRadius="md"
                        maxH="200px"
                        maxW="100%" // Menyesuaikan lebar gambar dengan kontainer
                        objectFit="cover"
                        display="inline-block" // Agar mx="auto" bekerja untuk konten block-level
                    />
                </Box>
            )}


            <VStack spacing={4} align="stretch" mt={6}>
                {data?.map((thread) => (
                    <Box
                        key={thread.id}
                        p={4}
                        shadow="md"
                        bgColor="black"
                    >
                        <Divider my={3} />

                        <HStack spacing={4}>
                            <Avatar size="md" name={thread.user.fullName}
                                src={thread.user.image || ""} />
                            <VStack align="start">
                                <HStack spacing={2}>
                                    <Text fontWeight="bold">  {thread.user.fullName}</Text>
                                    <Text fontSize={'small'} color={'grey'}>  {thread.user.email}</Text>
                                    <Text color="gray" fontSize={'small'}>2h</Text>
                                </HStack>

                                <Text>{thread.content}</Text>
                                {thread.image && (
                                    <Image
                                        src={thread.image}
                                        alt="Uploaded preview"
                                        mt={4}
                                        borderRadius="md"
                                        mx={'auto'}
                                        h={'200px'}


                                    />
                                )}
                            </VStack>
                        </HStack>
                        <HStack spacing={4} mt={2} ml={12}>
                            <IconButton
                                size="sm"
                                color={thread.isLiked ? "red" : "white"}
                                backgroundColor={'black'} // Ubah warna latar belakang
                                aria-label="Like"
                                icon={<FaHeart />}
                                onClick={() => handleToggleLike(thread.user.id, thread.id)}
                            />
                            <Text fontSize="sm" color="gray.300" ml={-4}>{thread.likesCount}</Text>
                            <HStack spacing={1} align="center">
                                <Link to={`/status/${thread.id}`}>
                                    <IconButton
                                        size="sm"
                                        colorScheme="#262626"
                                        aria-label="Comment"
                                        icon={<FaComment />}
                                    />
                                </Link>
                                <Text fontSize="sm" color="gray.300" ml={-1}>{thread.repliesCount}</Text>
                            </HStack>
                        </HStack>
                    </Box>

                ))}
            </VStack>
        </Box>
    );
}
