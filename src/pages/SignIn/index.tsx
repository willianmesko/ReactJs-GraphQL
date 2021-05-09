import { useHistory } from 'react-router';
import { Flex, Button, Stack, Text } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';


type SignInFormData = {
    email: string;
    password: string
};

const signInFormSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})

export default function SignIn() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const { signIn } = useAuth();
    const history = useHistory();

    const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await signIn({
            email,
            password,
        });

        history.push("/");


    }

    const { errors } = formState;

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
            <Text
                fontSize="4xl"
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
                alignSelf="center"
                mb="10"
            >
                GrowthHackers
            </Text>
            <Flex as="form" width="100%" maxW={400} height="100%" maxH={450} p="8" border="1px solid" borderColor="green.800" borderRadius={8} flexDir="column" onSubmit={handleSubmit(handleSignIn)}>
                <Stack spacing="4">

                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        letterSpacing="tight"
                        w="18"
                        alignSelf="center"
                    >
                        Log in
                    </Text>
                    <Input

                        type="email"
                        label="E-mail"
                        error={errors.email}
                        {...register('email')} />

                    <Input

                        type="password"
                        label="Password"
                        error={errors.password}
                        {...register('password')} />

                </Stack>
                <Button bg="green.800" type="submit" mt="6" isLoading={formState.isSubmitting}>Login</Button>
            </Flex>
        </Flex>
    )
}