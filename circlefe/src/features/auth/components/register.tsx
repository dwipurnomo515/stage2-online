// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import '../../../index.css'; // Impor file CSS global

const schema = z.object({
    fullname: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 character")
});

type RegisterFormInputs = z.infer<typeof schema>;


export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: RegisterFormInputs) => {
        console.log(data);
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
            <Stack spacing={2}>
                <Text color={"brand.main"} fontSize="4xl" fontWeight="bold" >
                    Circle
                </Text>
                <Text fontSize="3xl" fontWeight="bold">
                    Create account Circle
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box borderColor={'#545454'} >
                        <Input {...register("fullname")} mb={2} type="text" placeholder='Full Name*' name='fullname' />
                        {errors.fullname && (
                            <p style={{ color: "red", margin: 0 }}>{errors.fullname.message}</p>
                        )}
                        <Input {...register("email")} mb={2} type="email" placeholder='Email*' name='email' />
                        {errors.email && (
                            <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>
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
                        Register
                    </Button>
                </form>
                <text>Already have account? <Link as={RouterLink} to={"/login"} color={"brand.main"}>Login</Link></text>
            </Stack>
        </Box >
    );
};


