// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export function ForgotPassword() {
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
                    Forgot password
                </Text>
                <Box borderColor={'#545454'} >
                    <Input type="email" placeholder='Email*' name='email' />
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
                    Send Instruction
                </Button>
                <text>Already have account? <Link as={RouterLink} to={'/login'} color={"brand.main"}>Login</Link></text>
            </Stack>
        </Box >
    );
};


