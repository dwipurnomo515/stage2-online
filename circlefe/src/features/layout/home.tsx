// src/components/Layout.tsx
import { Box, Flex } from '@chakra-ui/react';
import { LeftBar } from '../nav/components/leftbar';
import { Rightbar } from '../nav/components/rightbar';
import { HomeMainContent } from '../nav/components/home';

export function HomeContent() {
    return (
        <Flex direction="row" p={4} bg="black" minH="100vh">
            <Box w="250px" mx={0} ml={-3} my={-5}>
                <LeftBar />
            </Box>
            <Box flex="1" ml={3} my={-3}>
                <HomeMainContent />
            </Box>
            <Box w="350px" my={-5} backgroundColor={'black'}>
                <Rightbar />
            </Box>
        </Flex>
    );
}
