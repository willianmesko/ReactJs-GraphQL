import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
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

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization:
        `Bearer ${localStorage.getItem('@token')}` || null,
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
          <AppProvider>
            <Routes />
            <ToastContainer />
          </AppProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}
