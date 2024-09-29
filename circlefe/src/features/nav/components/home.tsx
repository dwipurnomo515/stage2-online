import { useHome } from "@/features/layout/hook/useHome";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    Textarea,
    VStack,
    Avatar // Import Avatar component
} from "@chakra-ui/react";

export function HomeMainContent() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data, // Daftar thread
    } = useHome();

    return (
        <Box
            p={4}
            bgColor="black"
            color="white"
            borderLeft="2px solid grey" // Border kiri sepanjang halaman
            borderRight="2px solid grey" // Border kanan sepanjang halaman
            maxWidth="800px" // Menyesuaikan lebar konten halaman
            mx="auto" // Centering konten di halaman
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.content}>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                        id="content"
                        placeholder="Write your thread content here"
                        {...register("content")}
                        color="white"
                    />
                    <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.image}>
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <Input
                        type="file"
                        id="image"
                        {...register("image")}
                        accept="image/*"
                    />
                    <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>

                <Button
                    mt={4}
                    colorScheme="teal"
                    backgroundColor="brand.main"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Create Thread
                </Button>
            </form>

            <VStack spacing={4} align="stretch" mt={6}>
                {data?.map((thread) => (
                    <Box
                        key={thread.id}
                        p={4}
                        shadow="md"
                        bgColor="black"
                    >
                        <Divider my={3} />
                        <HStack spacing={4} align="center">
                            {/* Jika user.image ada, gunakan, jika tidak gunakan avatar default */}
                            <Avatar
                                name={thread.user.fullName} // Nama user, ditampilkan jika tidak ada gambar
                                src={thread.user.image || ""} // Gambar user jika ada
                                size="md" // Ukuran avatar medium
                            />
                            <Box flex="1">
                                <HStack mb={2}>
                                    <Text fontWeight="bold" color="white">
                                        {thread.user.fullName}
                                    </Text>
                                    <Text fontSize="sm" color="gray.300">
                                        {thread.user.email}
                                    </Text>
                                </HStack>
                                <Text fontWeight="bold" color="white">{thread.content}</Text>
                                {thread.image && (
                                    <img
                                        src={thread.image}
                                        alt="Thread image"
                                        style={{ maxWidth: "50%", height: "auto", marginTop: "8px" }}
                                    />
                                )}
                            </Box>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}
