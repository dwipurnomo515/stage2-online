// src/components/Layout.tsx
import { Box, Flex } from '@chakra-ui/react';
import { LeftBar } from '../nav/components/leftbar';
import { Rightbar } from '../nav/components/rightbar';
import { StatusMainContent } from '../nav/components/status';

export function StatusContent() {
    return (
        <Flex direction="row" p={4} bg="black" minH="100vh">
            <Box w="250px" mx={0} ml={-3} my={-5}>
                <LeftBar />
            </Box>
            <Box flex="1" ml={3} my={-3} borderX={'1px grey solid'}>
                <StatusMainContent />
            </Box>
            <Box w="350px" my={-5} backgroundColor={'black'}>
                <Rightbar />
            </Box>
        </Flex>
    );
}
