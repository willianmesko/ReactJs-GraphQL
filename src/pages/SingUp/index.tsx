import { Flex, Button, Stack, Text } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';

export default function SignUp() {
    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex as="form" width="100%" maxW={400} height="100%" maxH={400} bg="WITH" p="8" borderRadius={8} flexDir="column">
                <Stack spacing="4">
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        letterSpacing="tight"
                        w="64"
                        alignSelf="center"
                    >
                        GrowthHackers
                    </Text>
                    <Text
                        fontSize="1xl"
                        fontWeight="bold"
                        letterSpacing="tight"
                        w="32"
                        alignSelf="center"
                    >
                        Login
                    </Text>


                </Stack>
                <Button bg="green.800" type="submit" mt="6">Login</Button>
            </Flex>
        </Flex>
    )
}