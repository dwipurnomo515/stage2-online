// src/components/LeftBar.tsx
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Text,
    VStack,
    useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react';
import { FaBars, FaBell, FaHome, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function LeftBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

    return (
        <>
            {isMobile ? (
                <>
                    <IconButton
                        icon={<FaBars />}
                        variant="outline"
                        aria-label="Open Menu"
                        onClick={onOpen}
                        position="fixed"
                        top="1rem"
                        left="1rem"
                        zIndex="1000"
                        color="white"
                        backgroundColor="black"
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                    />

                    <Drawer
                        isOpen={isOpen}
                        onClose={onClose}
                        placement="left"
                    >
                        <DrawerOverlay />
                        <DrawerContent bg="black" color="white">
                            <DrawerCloseButton />
                            <DrawerHeader>
                                <Text color={'brand.main'} fontSize="5xl" fontWeight="bold">
                                    Circle
                                </Text>
                            </DrawerHeader>
                            <DrawerBody>
                                <VStack spacing={4} align="stretch">
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
                                        onClick={onOpen}
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

                                    <Button
                                        backgroundColor="brand.main"
                                        variant="solid"
                                        borderRadius={15}
                                        color={'white'}
                                        _hover={{
                                            bg: 'green.600',
                                            boxShadow: 'lg',
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Create Post
                                    </Button>

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
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </>
            ) : (
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
                        >
                            Create Post
                        </Button>
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
                </Box>
            )}
        </>
    );
};
