import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

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