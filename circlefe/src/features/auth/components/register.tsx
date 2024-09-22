// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../../index.css'; // Impor file CSS global
import { useRegisterForm } from '../hooks/use-register-form';


export function RegisterForm() {

    const { register, handleSubmit, errors, isSubmitting, onSubmit, backendError } = useRegisterForm();


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
                    Create account Circle
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box borderColor={'#545454'} >
                        <Input {...register("fullName")} mb={2} type="text" placeholder='Full Name*' name='fullName' />
                        {errors.fullName && (
                            <p style={{ color: "red", margin: 0 }}>{errors.fullName.message}</p>
                        )}
                        <Input {...register("email")} mb={2} type="email" placeholder='Email*' name='email' />
                        {errors.email && (
                            <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>
                        )}
                        {backendError && (
                            <Text color="red" mb={2}>{backendError}</Text>
                        )}
                        <Input {...register("password")} type="password" placeholder='Password*' name='password' />
                        {errors.password && (
                            <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>
                        )}
                    </Box>


                    <Button
                        type="submit"
                        backgroundColor={"brand.main"}
                        color={'white'}
                        borderRadius={17}
                        _hover={{
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }}
                        mt={2}
                        width={'full'}
                    >
                        {isSubmitting ? <Spinner /> : "Register"}

                    </Button>
                </form>
                <text>Already have account? <Link as={RouterLink} to={"/login"} color={"brand.main"}>Login</Link></text>
            </Stack>
        </Box >
    );
};


