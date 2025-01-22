// src/components/LoginForm.tsx
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';

export function ResetPassword() {
    return (
        <Box
            width={{ base: '90%', sm: '400px' }}
            p={6}
            borderRadius="md"
            boxShadow="md"
            bgColor="#1D1D1D"
            color="white"
        >
            <Stack spacing={2}>
                <Text color={"brand.main"} fontSize="4xl" fontWeight="bold" >
                    Circle
                </Text>
                <Text fontSize="3xl" fontWeight="bold">
                    Reset password
                </Text>
                <Box borderColor={'#545454'}>
                    <Input mb={2} type="password" placeholder='New Password*' name='newpassword' />
                    <Input type="password" placeholder='Confirm New Password*' name='confirmpassword' />
                </Box>


                <Button
                    backgroundColor={"brand.main"}
                    color={'white'}
                    borderRadius={17}
                    _hover={{
                        bg: 'green.600',
                        boxShadow: 'lg',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    }}>
                    Create New Password
                </Button>
            </Stack>
        </Box >
    );
};


