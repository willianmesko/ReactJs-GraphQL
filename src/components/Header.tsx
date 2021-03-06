import { useHistory, NavLink  } from 'react-router-dom';
import {
  Flex,
  Text,
  ButtonGroup,
  Button,
  UnorderedList,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const history = useHistory();
  const { user, signOut } = useAuth();

  return (
    <>
      <Flex
        alignItems="baseline"
        as="header"
        w="100%"
        h="20"
        mx="auto"
        px="10"
        align="center"
        bg="whiteAlpha.300"
        justifyContent="space-between"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          letterSpacing="tight"
          w="64"
          _hover={{
            cursor: 'pointer',
          }}
          onClick={() => history.push('/')}
        ></Text>

        {user ? (
          <Button
            onClick={() => signOut()}
            borderRadius="30px"
            w="100px"
            color="black"
            colorScheme="with"
            mt="6"
          >
            Log out
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              onClick={() => history.push('/signUp')}
              color="#000"
              borderRadius="30px"
              w="100px"
              bg="pink.300"
              mt="6"
            >
              Join Us
            </Button>
            <Button
              onClick={() => history.push('/signIn')}
              borderRadius="30px"
              w="100px"
              bg="pink.300"
              color="#000"
              mt="6"
            >
              Login
            </Button>
          </ButtonGroup>
        )}
      </Flex>
      <Flex
        as="header"
        w="100%"
        h="60px"
        mx="auto"
        px="10"
        align="center"
        bg="pink.500"
      >
        <UnorderedList
          fontSize="18"
          fontWeight="bold"
          display="flex"
          listStyleType="none"
        >
          <NavLink  exact to="/" activeStyle={{color:"pink"}} >
            Departments
          </NavLink >
          {user && (
            <NavLink 
              to="/favorites" activeStyle={{color:"pink"}}>
              My Favorites
            </NavLink >
          )}
        </UnorderedList>
      </Flex>
    </>
  );
}
