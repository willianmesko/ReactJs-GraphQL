import { Box, Image, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import moneyFormat from '../utils/moneyFormat';
import checkProductIsFavorite from '../utils/checkProductIsFavorite';
import { Product } from '../interfaces/Product.interface';
import { useHistory } from 'react-router-dom';
import { useFavorite } from '../hooks/useFavorites';

export interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { user } = useAuth();
  const { favorites, createFavorite, deleteFavorite } = useFavorite();
  const history = useHistory();
  return (
    <Box
      key={product.id}
      transition="all 0.25s ease"
      w="300px"
      h="400px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        opacity: '0.8',
        cursor: 'pointer',
      }}
    >
      <Image src={product.imageUrl} alt={product.name} w="100%" h="60" />

      <Box p="6">
        <Box d="flex" justifyContent="space-between" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Promo
          </Badge>
          {checkProductIsFavorite(favorites, product) ? (
            <MdFavorite
              onClick={() =>
                user ? deleteFavorite({
                  variables: { 
                     productName: product.name
                  }
                }) : history.push('/signIn')
              }
            />
          ) : (
            <MdFavoriteBorder
              onClick={() =>
                user ? createFavorite({
                  variables: {
                    data: {
                       product
                    }
                  }
                }) : history.push('/signIn')
              }
            />
          )}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
          isTruncated
        >
          {product.name}
        </Box>

        <Box>{moneyFormat.format(product.price)}</Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < product.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {product.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
