import {
  Center, Stack, Box, Image, Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

interface FavoritesBlockProps {
  name: string;
  image?: string;
}

export function DepartmentBlock({ name, image }: FavoritesBlockProps) {
  const history = useHistory();
  return (
    <Stack>
      <Box
        onClick={() => history.push(`products/${name.toLocaleLowerCase()}`)}
        bg="white"
        borderRadius="6px"
        color="white"
        transition="all 0.25s ease"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.05)',
          border: '3px solid #12ac8e',
        }}
        h="40vh"
        w="25vw"
      >
        <Image alt={name} w="100%" h="100%" src={image} />
      </Box>
      <Center>
        <Text fontWeight="bold" fontSize="lg" color="brand.500">
          {name}
        </Text>
      </Center>
    </Stack>
  );
}
