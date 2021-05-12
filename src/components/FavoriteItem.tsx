import { Flex, Box, Text, Image, Stack, Button } from '@chakra-ui/react';
import { Product } from '../interfaces/Product.interface';
import { useApp } from '../hooks/useContext';

interface FavoriteItemProps {
  products: Product[];
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function FavoriteItem({ products }: FavoriteItemProps) {
  const { removeFavorite } = useApp();

  return (
    <Stack>
      {products?.length > 0 ? (
        products.map((product, i) => (
          <Flex
            key={i}
            h="200px"
            w="900px"
            borderBottom="1px solid gray"
            py={4}
            px={12}
            bg="with"
            color="white"
          >
            <Image mr="5" src={product.imageUrl} w="25%" />
            <Box width="70%">
              <Text fontSize="2xl" letterSpacing="tight" color="gray.400">
                {product.name}
              </Text>
              <Text fontSize="20" mt="2" letterSpacing="tight" color="black">
                {formatter.format(product.price)}
              </Text>
            </Box>
            <Flex flexDir="column">
              <Button w="200px" bg="blue.400">
                Buy
              </Button>

              <Text
                mt="2"
                onClick={() => removeFavorite(product)}
                _hover={{
                  cursor: 'pointer',
                  color: 'black',
                }}
                fontSize="20"
                textAlign="center"
                color="gray.600"
              >
                Remove
              </Text>
            </Flex>
          </Flex>
        ))
      ) : (
        <h1>No favorites </h1>
      )}
    </Stack>
  );
}
