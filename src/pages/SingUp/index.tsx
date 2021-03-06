import { useHistory } from 'react-router';
import { Flex, Button, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/Form/Input';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../GraphQL/user.mutations';
import { toast } from 'react-toastify';
type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const signUpFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const SignUp = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });
  const [createUser] = useMutation(CREATE_USER, {
    onError() {
      toast.error('Account already exist');
    },
    onCompleted() {
      history.push('/signin');
    },
  });
  const history = useHistory();
  const handleSingUp: SubmitHandler<SignUpFormData> = async ({
    name,
    email,
    password,
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    createUser({
      variables: {
        data: {
          email,
          password,
          name,
        },
      },
    });
  };

  const { errors } = formState;

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Flex
        as="form"
        width="100%"
        maxW={400}
        height="100%"
        maxH={600}
        p="8"
        border="1px solid"
        borderColor="pink.500"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingUp)}
      >
        <Stack spacing="4">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="tight"
            w="18"
            alignSelf="center"
          >
            Sign Up
          </Text>
          <Input
            type="name"
            label="Name"
            error={errors.email}
            {...register('name')}
          />
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            type="password"
            label="Password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Button
          bg="pink.500"
          type="submit"
          mt="6"
          color="#000"
          isLoading={formState.isSubmitting}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
}
export default SignUp;
