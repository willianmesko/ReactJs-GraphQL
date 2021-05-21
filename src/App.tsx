import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './GraphQL/client';
import { ToastContainer } from 'react-toastify';
import { theme } from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { QueryParamProvider } from 'use-query-params';

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
