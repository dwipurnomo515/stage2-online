import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';

export function Follows() {
    const followers = [
        { id: 1, username: 'john_doe', avatarUrl: 'https://bit.ly/dan-abramov' },
        { id: 2, username: 'jane_doe', avatarUrl: 'https://bit.ly/kent-c-dodds' },
    ];

    const follows = [
        { id: 1, username: 'alice', avatarUrl: 'https://bit.ly/sage-adebayo' },
        { id: 2, username: 'bob', avatarUrl: 'https://bit.ly/ryan-florence' },
    ];

    return (
        <Box w="full" display="flex" flexDirection={'column'} color={"white"} mt={2}>
            <Tabs variant="enclosed" colorScheme="teal">
                <TabList>
                    {/* Tab Followers */}
                    <Tab
                        flex={1}
                        _selected={{ borderBottom: '6px solid green', color: 'white' }}
                    >
                        Followers
                    </Tab>
                    {/* Tab Follows */}
                    <Tab
                        flex={1}
                        _selected={{ borderBottom: '6px solid green', color: 'white' }}
                    >
                        Follows
                    </Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanels display={'flex'} flexDirection={'row'} mt={6}>
                    {/* Panel Followers */}
                    <TabPanel p={0} flex="1">
                        {followers.length > 0 ? (
                            followers.map((follower) => (
                                <Box key={follower.id} display="flex" alignItems="center" mb={4}>
                                    <img
                                        src={follower.avatarUrl}
                                        alt={follower.username}
                                        style={{ borderRadius: '50%', width: '40px', marginRight: '10px' }}
                                    />
                                    <Text>{follower.username}</Text>
                                </Box>
                            ))
                        ) : (
                            <Text>No followers available.</Text>
                        )}
                    </TabPanel>

                    {/* Panel Follows */}
                    <TabPanel p={0} flex="1">
                        {follows.length > 0 ? (
                            follows.map((follow) => (
                                <Box key={follow.id} display="flex" alignItems="center" mb={4}>
                                    <img
                                        src={follow.avatarUrl}
                                        alt={follow.username}
                                        style={{ borderRadius: '50%', width: '40px', marginRight: '10px' }}
                                    />
                                    <Text>{follow.username}</Text>
                                </Box>
                            ))
                        ) : (
                            <Text>No follows available.</Text>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default Follows;
