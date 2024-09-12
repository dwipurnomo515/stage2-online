// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import '../../../index.css'; // Impor file CSS global


const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 character")
});

type LoginFormInputs = z.infer<typeof schema>;

interface login {
    email: string;
    password: string;
}
export function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    const [Login, setLogin] = useState<login>({
        email: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.name, e.target.value);

        setLogin({
            ...Login,
            [e.target.name]: [e.target.value],
        });
    }

    function handelSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email && !password) {
            setError('Email dan Password harus diisi');

        } else if (!email) {
            setError('Email harus diisi');
        } else if (!password) {
            setError('Passowrd harus diisi');
        } else {
            navigate('/');
        }
    }


    return (
        <Box
            width={{ base: '90%', sm: '400px' }}
            p={6}
            borderRadius="md"
            boxShadow="md"
            bgColor="#1D1D1D"
            color="white"
        >
            <form onSubmit={handelSubmit}>
                <Stack spacing={2}>
                    <Text color={"brand.main"} fontSize="4xl" fontWeight="bold" >
                        Circle
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold">
                        Login to Circle
                    </Text>
                    <Box borderColor={'#545454'} >
                        <Input  {...register("email")} onChange={(e) => setEmail(e.target.value)} mb={2} type="email" placeholder='Email*' name='email' />
                        {errors.email && (
                            <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>
                        )}
                        <Input {...register("password")} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password*' name='password' />
                        {errors.password && (
                            <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>
                        )}
                    </Box>
                    {error && (
                        <Text color="red" mt={2}>
                            {error}
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


