import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Text, VStack, List, ListItem, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiV1 } from '../../../libs/api';
import Cookies from 'js-cookie';
import { Follower, Following } from '../types/follows';
import FollowButton from '../button/follow';

export function Follows() {
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [following, setFollowing] = useState<Following[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiV1.get('/follows', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });

                console.log("Full response:", response.data);

                // Perhatikan bahwa kita perlu mengakses response.data.data
                const followsData = response.data.data.followers.map((item: any) => item.follower) || [];
                const followersData = response.data.data.following.map((item: any) => item.following) || [];

                console.log("Processed Followers Data:", followersData);
                console.log("Processed Following Data:", followsData);

                setFollowers(followersData);
                setFollowing(followsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    // Debugging logs to check fetched data
    console.log("Fetched followers:", followers);
    console.log("Fetched following:", following);

    return (
        <Box w="full" display="flex" flexDirection={'column'} color={"white"} mt={2}>
            <Tabs variant="enclosed" colorScheme="teal">
                <TabList>
                    <Tab flex={1} _selected={{ borderBottom: '6px solid green', color: 'white' }}>
                        Followers
                    </Tab>
                    <Tab flex={1} _selected={{ borderBottom: '6px solid green', color: 'white' }}>
                        Follows
                    </Tab>
                </TabList>

                <TabPanels display={'flex'} flexDirection={'row'} mt={6}>
                    <TabPanel p={0} flex="1">
                        {followers.length > 0 ? (
                            followers.map((follower) => (
                                <Box key={follower.id} display="flex" alignItems="center" mb={4}>
                                    <img
                                        src={follower.profileImage}
                                        alt={follower.fullName}
                                        style={{ borderRadius: '50%', width: '40px', marginRight: '10px' }}
                                    />
                                    <VStack align="start" spacing={0}>
                                        <Text fontWeight="bold">{follower.fullName}</Text>
                                        <Text color="white">{follower.email}</Text>
                                        <Text color="white" fontSize="sm">{follower.bio}</Text>
                                    </VStack>
                                </Box>

                            ))
                        ) : (
                            <Text>No followers available.</Text>
                        )}
                    </TabPanel>

                    <TabPanel p={0} flex="1">
                        {following.length > 0 ? (
                            following.map((follow) => (
                                < List spacing={1}>
                                    <ListItem
                                        key={follow.id}
                                        p={2}
                                        borderRadius="md"
                                        _hover={{ bg: 'gray.900', cursor: 'pointer' }}
                                    >
                                        <Flex align="center" justify="space-between">
                                            <Flex align="center">
                                                <Image
                                                    src={follow.profileImage}
                                                    alt={`${follow.fullName}'s avatar`}
                                                    borderRadius="full"
                                                    boxSize="40px"
                                                    mr={2}
                                                />
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="bold">{follow.fullName}</Text>
                                                    <Text color="white">{follow.email}</Text>
                                                    <Text color="white" fontSize="sm">{follow.bio}</Text>
                                                </VStack>
                                            </Flex>
                                            <FollowButton userId={follow.id} />

                                        </Flex>
                                    </ListItem>
                                </List>

                            ))

                        ) : (
                            <Text>No follows available.</Text>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box >
    );
}

export default Follows;
