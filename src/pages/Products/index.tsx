import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Flex, Box, SimpleGrid, Image, Badge, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { Header } from '../../components/Header';
import { productsApi } from '../../services/products.service';
import { Product } from '../../interfaces/Product.interface';
import { useAuth } from '../../hooks/useAuth';
import { Pagination } from '../../components/Pagination';

interface RouteParams {
    category: string
}

export default function Products() {
    const { category } = useParams<RouteParams>();
    const { user, addFavorites, configs, setConfigs } = useAuth();
    const [_, setPage] = useState();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCountOfRegister, setTotalCountOfRegistes] = useState<number>(0)




    async function getProducts(category: string, page: number): Promise<void> {

        const response = await productsApi.getProducts(category, page);

        setProducts(response.data);
        setTotalCountOfRegistes(response.totalCount);

    }
    useEffect(() => {
        getProducts(category, configs?.productCurrentPage)
    }, [configs?.productCurrentPage])




    return (
        <>
            <Header />
            <Flex w="100vw" h="80vh" align="center" justify="center" flexDirection="column">

                <SimpleGrid columns={3} spacing={20}>
                    {products && products.map(product => {
                        return (
                            <Box transition="all 0.25s ease" w="350px" height="400px" borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{
                                opacity: "0.8",
                                cursor: "pointer"
                            }}>
                                <Image src={product.imageUrl} alt={product.name} w="100%" h="60" />

                                <Box p="6">
                                    <Box d="flex" justifyContent="space-between" alignItems="baseline">
                                        <Badge borderRadius="full" px="2" colorScheme="teal">
                                            Promo
                                        </Badge>
                                        {user && <Icon onClick={() => addFavorites(product)} as={MdFavorite} w={5} h={5} color="with" />}

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

                                    <Box>
                                        {product.price}

                                    </Box>

                                    <Box d="flex" mt="2" alignItems="center">
                                        {Array(5)
                                            .fill("")
                                            .map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={i < product.rating ? "teal.500" : "gray.300"}
                                                />
                                            ))}
                                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                            {product.reviewCount} reviews
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}

                </SimpleGrid>
                {products && <Pagination
                    who="products"
                    totalCountOfRegister={totalCountOfRegister}
                    currentPage={configs?.productCurrentPage}
                />}


            </Flex>
        </>
    )

}