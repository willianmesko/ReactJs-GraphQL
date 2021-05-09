import { Flex, Center, SimpleGrid } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { FavoritesBlock } from '../../components/FavoritesBlock';
import accesoriesImage from '../../assets/acessories.jpg';

export default function Home() {
    return (
        <>
            <Header />
            <Flex w="100vw" h="80vh" align="center" justify="center">

                <SimpleGrid columns={3} spacing={20}>
                    <FavoritesBlock name="Televisions" image={accesoriesImage} />
                    <FavoritesBlock name="Games" />
                    <FavoritesBlock name="Games" />
                </SimpleGrid>

            </Flex>
        </>
    )
}