import { Center, Stack, Box, Image, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'

interface FavoritesBlockProps {
    name: string;
    image?: string;
}

export function FavoritesBlock({ name, image }: FavoritesBlockProps) {
    const history = useHistory();
    return (
        <Stack>
            <Box
                onClick={() => history.push(`products/${name.toLocaleLowerCase()}`)}
                bg="white"
                borderRadius="3xl"
                color="white"
                transition="all 0.25s ease"
                _hover={
                    {
                        cursor: 'pointer',
                        transform: "scale(1.05)",
                        border: "3px solid #12ac8e"
                    }
                }
                h="350px"
                w="350px"
                py={4}
                px={12}
            >
                <Image alt={name} borderRadius="full" w="100%" h="100%" src={image} />
            </Box>
            <Center>
                <Text fontWeight="bold" fontSize="lg" color="brand.500">
                    {name}
                </Text>
            </Center>
        </Stack >
    )
}