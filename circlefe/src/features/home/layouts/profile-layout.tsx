import { Box, Flex } from "@chakra-ui/react";
import { LeftBar } from "../components/leftbar";
import { SubRightbar } from "../components/sub-rightbar";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction="row"
      minH="100vh"
      bg="black"
      width="100vw"
      maxWidth="100vw"
      overflow="hidden"
    >
      <Box
        w="250px"
        flexShrink={0}
        overflowY="auto"
        boxSizing="border-box"
        borderRight={"1px solid grey"}
      >
        <LeftBar />
      </Box>

      <Box
        flex="1"
        px={4}
        overflowY="auto"
        boxSizing="border-box"
        borderLeft={"1px solid grey"}
        borderRight={"1px solid grey"}
      >
        {children}
      </Box>

      <Box
        w="350px"
        flexShrink={0}
        overflowY="auto"
        boxSizing="border-box"
        ml={3}
      >
        <SubRightbar />
      </Box>
    </Flex>
  );
}
