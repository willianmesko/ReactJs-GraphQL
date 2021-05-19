import {
  Flex,
  Box,
  Text,
  Image,
  Stack,
  Button,
} from '@chakra-ui/react';
import { Product } from '../interfaces/Product.interface';
import { useFavorite } from '../hooks/useFavorites';
import moneyFormat from '../utils/moneyFormat';
interface FavoriteItemProps {
  products: Product[];
}

export default function FavoriteItem({ products }: FavoriteItemProps) {
  const { removeFavorite } = useFavorite();


  return (
    <Stack>
     
      {products ? (
        products.map((product) => (
          <Flex
            key={product.id}
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
                {moneyFormat.format(product.price)}
              </Text>
            </Box>
            <Flex flexDir="column">
              <Button w="200px" bg="blue.400">
                Buy
              </Button>

              <Text
                mt="2"
                onClick={ () => 
                 
                   removeFavorite(product)
                  
                }
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
