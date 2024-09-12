// src/components/Layout.tsx
import { Box, Flex } from '@chakra-ui/react';
import { LeftBar } from '../nav/components/leftbar';
import { SubRightbar } from '../nav/components/sub-rightbar';
import { OtherProfilePage } from '../pages/components/other-profile';

export function OtherProfileContent() {
    return (
        <Flex direction="row" p={4} bg="black" minH="100vh">
            <Box w="250px" mx={0} ml={-3} my={-5}>
                <LeftBar />
            </Box>
            <Box flex="1" ml={3} my={-3} borderX={'1px grey solid'} mr={3}>
                <OtherProfilePage />
            </Box>
            <Box w="350px" my={-5} backgroundColor={'black'}>
                <SubRightbar />
            </Box>
        </Flex>
    );
}
