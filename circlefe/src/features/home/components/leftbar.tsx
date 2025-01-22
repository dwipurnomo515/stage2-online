import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaBell, FaHome, FaImage, FaSearch, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useThread } from '../hooks/use-thread';


export function LeftBar() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure(); // Mengontrol modal
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        handleImageChange,
        previewImage,


    } = useThread(onClose);






    return (
        <Box
            as="aside"
            width="250px"
            bg="black"
            p={4}
            boxShadow="md"
            height="100vh"
            position="fixed"
            backgroundColor={'black'}
            color={'white'}
        >
            <VStack spacing={1} align="stretch">
                {/* Logo */}
                <Box mb={2}>
                    <Text color={'brand.main'} fontSize="5xl" fontWeight="bold">
                        Circle
                    </Text>
                </Box>

                {/* Navigation Links */}
                <VStack spacing={1} align="stretch">
                    <Button
                        leftIcon={<FaHome />}
                        variant="outline"
                        border={'none'}
                        size="lg"
                        justifyContent="flex-start"
                        width="100%"
                        textAlign="left"
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                        color={'white'}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>

                    <Button
                        leftIcon={<FaSearch />}
                        variant="outline"
                        border={'none'}
                        size="lg"
                        justifyContent="flex-start"
                        width="100%"
                        textAlign="left"
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => navigate('/search')}
                        color={'white'}
                    >
                        Search
                    </Button>

                    <Button
                        leftIcon={<FaBell />}
                        variant="outline"
                        border={'none'}
                        size="lg"
                        justifyContent="flex-start"
                        width="100%"
                        textAlign="left"
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => navigate('/follows')}
                        color={'white'}
                    >
                        Follows
                    </Button>

                    <Button
                        leftIcon={<FaUser />}
                        variant="outline"
                        size="lg"
                        border={'none'}
                        justifyContent="flex-start"
                        width="100%"
                        textAlign="left"
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                        color={'white'}
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </Button>
                </VStack>

                {/* Create Post Button */}
                <Button
                    backgroundColor="brand.main"
                    variant="solid"
                    mt={1}
                    borderRadius={15}
                    color={'white'}
                    _hover={{
                        bg: 'green.600',
                        boxShadow: 'lg',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={onOpen} // Buka modal ketika diklik
                >
                    Create Post
                </Button>

                {/* Logout Button */}
                <Box mt="180">
                    <Button
                        leftIcon={<FaSignOutAlt />}
                        backgroundColor={'brand.background'}
                        color={'white'}
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Text>Logout</Text>
                    </Button>
                </Box>
            </VStack>

            {/* Modal Create Post */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#1E1E1E" color="white">
                    <ModalHeader>
                        <HStack>
                            <Avatar
                                size="sm"
                                name="User Name"
                                src="https://storage.googleapis.com/a1aa/image/o0Gu6uXrbA44Clhm5uSnNMXAYnT7s0RYdAGiRhejQHdPDF0JA.jpg"
                            />
                            <IconButton
                                aria-label="Close modal"
                                icon={<FaTimes />}
                                color="#888"
                                variant="ghost"
                                onClick={onClose}
                                size="sm"
                                ml="auto"
                            />
                        </HStack>
                    </ModalHeader>

                    <ModalBody>
                        <form id="thread-form" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                            <FormControl isInvalid={!!errors.content}>
                                <Textarea
                                    placeholder="What is happening?!"
                                    resize="none"
                                    bg="#1E1E1E"
                                    border="none"
                                    color="white"
                                    _focus={{ boxShadow: 'none' }}
                                    _placeholder={{ color: 'gray.500' }}
                                    {...register("content")}
                                />
                                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                            </FormControl>

                            {/* Preview Image */}
                            {previewImage && (
                                <Box mt={4}>
                                    <Image src={previewImage} alt="Preview" borderRadius="md" />
                                </Box>
                            )}

                            <ModalFooter display="flex" justifyContent="space-between">
                                <IconButton
                                    as={"label"}
                                    aria-label="Upload Image"
                                    icon={<FaImage />}
                                    htmlFor="image-cuy"
                                    color="#00A000"
                                    boxSize={10}
                                    bg={"transparent"}
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    display="none" // Sembunyikan input file
                                    id="image-cuy"
                                    {...register("image")}
                                    onChange={handleImageChange}
                                />
                                <Button
                                    type="submit"
                                    bg="#00A000"
                                    color="white"
                                    _hover={{ bg: "#007700" }}
                                    borderRadius="20px"
                                    isLoading={isSubmitting}
                                    form="thread-form"

                                >
                                    Post
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
