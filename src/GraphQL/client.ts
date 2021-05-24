import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://18.228.206.153:3333/graphql'});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('@token')}` || null,
    },
  });

  return forward(operation);
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});