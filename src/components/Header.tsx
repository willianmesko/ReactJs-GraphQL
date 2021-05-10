import { useHistory, useLocation } from 'react-router';
import {
  Flex,
  Text,
  ButtonGroup,
  Button,
  ListItem,
  UnorderedList,

} from '@chakra-ui/react';
import { useApp } from '../hooks/useContext';


export function Header() {
  const history = useHistory();
  const location = useLocation();
  const { user, signOut } = useApp();

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
        >
          GrowthHackers
        </Text>

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
              color="with"
              borderRadius="30px"
              w="100px"
              colorScheme="yellow"
              mt="6"
            >
              Join Us
            </Button>
            <Button
              onClick={() => history.push('/signIn')}
              borderRadius="30px"
              w="100px"
              color="with"
              colorScheme="yellow"
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
        bg="green.800"
      >
        <UnorderedList
          fontSize="18"
          fontWeight="bold"
          display="flex"
          listStyleType="none"
        >
          <ListItem
            onClick={() => history.push('/')}
            _hover={{
              color: 'white',
              cursor: 'pointer',
            }}
            color={location.pathname === '/' ? 'white' : 'current'}
            mr="5"
          >
            Departaments
          </ListItem>
          {user && (
            <ListItem
              onClick={() => history.push('/favorites')}
              _hover={{
                color: 'white',
                cursor: 'pointer',
              }}
              color={location.pathname === '/favorites' ? 'white' : 'current'}
            >
              My Favorites
            </ListItem>
          )}
        </UnorderedList>
      </Flex>
    </>
  );
}
