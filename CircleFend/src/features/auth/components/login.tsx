// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../../index.css'; // Impor file CSS global
import { useState } from 'react';
import { useLoginForm } from '../hooks/use-login';
import { LoginFormInputs } from '../schemas/login';



export function LoginForm() {

    const { register, onSubmit, errors, handleSubmit } = useLoginForm();
    const [loginError, setLoginError] = useState(''); // State untuk menyimpan pesan kesalahan

    const handleLoginSubmit = async (data: LoginFormInputs) => {
        setLoginError(''); // Reset pesan kesalahan
        const success = await onSubmit(data); // Panggil onSubmit

        if (!success) {
            setLoginError('Email atau password Anda salah.'); // Set pesan kesalahan jika login gagal
        }
    };

    return (
        <Box
            width={{ base: '90%', sm: '400px' }}
            p={6}
            borderRadius="md"
            boxShadow="md"
            bgColor="#1D1D1D"
            color="white"
        >
            <form onSubmit={handleSubmit(handleLoginSubmit)}>

                <Stack spacing={2}>
                    <Text color={"brand.main"} fontSize="4xl" fontWeight="bold" >
                        Circle
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold">
                        Login to Circle
                    </Text>

                    <Box borderColor={'#545454'} >
                        <Input  {...register("email")} mb={2} type="email" placeholder='Email*' name='email' />
                        {errors.email && (
                            <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>
                        )}
                        <Input {...register("password")} type="password" placeholder='Password*' name='password' />
                        {errors.password && (
                            <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>
                        )}
                    </Box>

                    {loginError && ( // Tampilkan pesan kesalahan di atas tombol login
                        <Text color="red.500" textAlign="center" mt={-3}>
                            {loginError}
                        </Text>
                    )}
                    <Box textAlign="end">
                        <Link as={RouterLink} to={"/forgotpassword"} fontSize="sm">
                            Forgot Password?
                        </Link>
                    </Box>

                    <Button
                        type='submit'
                        backgroundColor={"brand.main"}
                        color={'white'}
                        borderRadius={17}
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Login
                    </Button>
                    <text>Don't have an account yet? <Link as={RouterLink} to={"/register"} color={"brand.main"}>Create account</Link></text>
                </Stack>
            </form>
        </Box >
    );
};


