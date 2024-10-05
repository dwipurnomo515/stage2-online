import { Box, Flex } from "@chakra-ui/react";
import { LeftBar } from "../components/leftbar";
import { Rightbar } from "../components/righbar";

export function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex direction="row" minH="100vh" bg="black" width="100vw" maxWidth="100vw" overflow="hidden">
            {/* LeftBar dengan lebar tetap */}
            <Box w="250px" flexShrink={0} overflowY="auto" boxSizing="border-box" borderRight={"1px solid grey"}>
                <LeftBar />
            </Box>

            {/* Konten tengah yang fleksibel */}
            <Box flex="1" px={4} overflowY="auto" boxSizing="border-box" borderLeft={"1px solid grey"}>
                {children}
            </Box>

            {/* RightBar dengan lebar tetap */}
            <Box w="350px" flexShrink={0} overflowY="auto" boxSizing="border-box" borderLeft={"1px solid grey"}>
                <Rightbar />
            </Box>
        </Flex>
    );
}
