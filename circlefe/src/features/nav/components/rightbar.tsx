// src/components/Rightbar.tsx
import { useAppSelector } from '@/hooks/use-store';
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import profileBackground from '../../../assets/a.jpg'; // Pastikan path ini benar

export function Rightbar() {
    const { fullName, email } = useAppSelector((state) => state.auth);
    console.log("Redux state auth:", useAppSelector((state) => state.auth));
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    return (
        <Box
            w="350px" // Lebar card
            bg="black" // Background untuk keseluruhan Rightbar
            boxShadow="md"
            borderRadius="md"

        >
            {/* Profil Section */}
            <Box
                mb={6}
                p={3} // Mengurangi padding
                borderRadius="md"
                border="1px solid black"
                bg="#262626" // Background color untuk profil card
                color="white"
                position="relative"
                overflow="hidden" // Mengatur overflow untuk menutupi bagian avatar yang keluar dari card
            >
                {/* Teks My Profile */}
                <Text
                    fontSize="md" // Mengurangi ukuran font
                    fontWeight="bold"
                    color="white"
                    mb={3} // Mengurangi jarak antara teks dan gambar latar belakang
                >
                    My Profile
                </Text>
                {/* Background Image */}
                <Box
                    h="80px" // Mengecilkan ukuran background image
                    borderRadius="md"
                    backgroundImage={`url(${profileBackground})`}
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
                            size="lg" // Mengurangi ukuran avatar
                            name="User Name"
                            src="https://bit.ly/dan-abramov"
                            border="2px solid white"
                            borderRadius="full"
                        />
                    </Box>
                </Box>
                {/* Edit Profile Button */}
                <HStack spacing={3} mt={3} justify="flex-end"> {/* Mengurangi jarak dan padding */}
                    <Button
                        colorScheme="green"
                        size="sm"
                        variant="outline"
                        borderColor="white"
                        color="white"
                        borderRadius="full"
                        _hover={{ borderColor: 'green.400', color: 'green.400' }}
                    >
                        Edit Profile
                    </Button>
                </HStack>
                <VStack align="start" spacing={1}>
                    <Text fontSize="xl" fontWeight="bold">{fullName}</Text>
                    <Text fontSize={'sm'} color={'#909090'}>{email}</Text>
                    <Text fontSize="sm" color="gray.200">picked over by the worms, and weird fishes</Text>
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
            </Box>

            {/* Suggested Users Section */}
            <Box
                p={4}
                borderRadius="md"
                border="1px solid black"
                bg="#262626" // Background color untuk suggestion card
                color="white"
                mb={6}
            >
                <Text fontSize="lg" fontWeight="bold">Suggested for You</Text>

                <VStack spacing={1} align="stretch">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Box key={item} display="flex" alignItems="center" p={2} borderRadius="md" bg="transparent">
                            <Avatar size="sm" name={`User ${item}`} src={`https://bit.ly/dan-abramov`} mr={3} />
                            <VStack spacing={1} align="start" flex="1">
                                <Text fontSize="sm" fontWeight="bold">User {item}</Text>
                                <Text fontSize="xs" color="gray.400">user{item}@example.com</Text>
                            </VStack>
                            <Button
                                ml="auto"
                                size="sm"
                                colorScheme="white"
                                variant={item === 1 ? "solid" : "outline"} // "Following" untuk pengguna pertama
                                borderColor="white"
                                color={item === 1 ? "white" : "white.400"}
                                borderRadius="full"
                                _hover={{ borderColor: item === 1 ? 'white.400' : 'white', color: item === 1 ? 'white.400' : 'white' }}
                            >
                                {item === 1 ? "Following" : "Follow"}
                            </Button>
                        </Box>
                    ))}
                </VStack>
            </Box>

            {/* Footer Section */}
            <Box
                p={1}
                borderRadius="sm"
                border="1px solid black"
                bg="#262626" // Background color untuk credit card
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
