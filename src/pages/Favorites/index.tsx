import { useState } from 'react';
import { Flex, Box, Text, Stack, Image, Button, ButtonGroup } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { paginationHelper } from '../../utils/pagination';

const per_page = 3;
export default function Favorites() {
    const { favorites } = useAuth();
    const [totalCountOfRegister, setTotalCountOfRegistes] = useState<number>((favorites && favorites.length > 0) ? favorites.length : 0)
    const { user, addFavorites, configs, setConfigs } = useAuth();

    return (
        <>
            <Header />

            <Flex w="100vw" h="80vh" align="center" justify="center" flexDir="column" >

                <Stack>
                    {favorites
                        && favorites.length > 0 &&
                        paginationHelper(favorites, configs.favoritesCurrentPage, per_page).map(favorite => {

                            return (

                                <Flex h="200px"
                                    w="900px"
                                    borderBottom="1px solid gray"

                                    py={4}
                                    px={12} bg="with" color="white">
                                    <Image src={favorite.imageUrl} w="25%" />
                                    <Box width="70%">
                                        <Text fontSize="2xl" letterSpacing="tight" color="gray.400">
                                            {favorite.name}
                                        </Text>
                                        <Text fontSize="2xl" letterSpacing="tight" color="black">
                                            $ {favorite.price}
                                        </Text>
                                    </Box>
                                    <ButtonGroup flexDir="column" justifyContent="space-around">
                                        <Button w="200px" bg="blue.400">
                                            Buy
                                        </Button>
                                        <Button w="200px" bg="red.400">
                                            Remove
                                        </Button>
                                    </ButtonGroup>
                                </Flex>


                            )

                        })
                    }

                </Stack>
                {favorites && favorites.length > 0 && <Pagination
                    who="favorites"
                    totalCountOfRegister={totalCountOfRegister}
                    currentPage={configs?.favoritesCurrentPage}
                />}

            </Flex>
        </>
    )
}