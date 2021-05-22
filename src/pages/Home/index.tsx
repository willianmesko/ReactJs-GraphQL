import { Flex, SimpleGrid } from '@chakra-ui/react';
import Header from '../../components/Header';
import DepartmentBlock from '../../components/DepartmentBlock';
import TelevisionImage from '../../assets/acessories.webp';
import GamesImage from '../../assets/ps5.jpeg';

const Home = () => {
  return (
    <>
      <Header />
      <Flex w="100vw" h="80vh" align="center" justify="center">
        <SimpleGrid columns={2} spacing={20}>
          <DepartmentBlock name="Televisions" image={TelevisionImage} />
          <DepartmentBlock name="Games" image={GamesImage} />
        </SimpleGrid>
      </Flex>
    </>
  );
}
export default Home;
