import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL});

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