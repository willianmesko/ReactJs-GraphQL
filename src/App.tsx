import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeServer } from './mirage';

makeServer();

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppProvider>
          <Routes />
          <ToastContainer />
        </AppProvider>
      </Router>
    </ChakraProvider>
  );
}
