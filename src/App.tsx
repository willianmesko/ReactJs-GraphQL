import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { theme } from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { QueryParamProvider } from 'use-query-params';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('@token')}` || null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppProvider>
            <Routes />
            <ToastContainer />
          </AppProvider>
          </QueryParamProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}
