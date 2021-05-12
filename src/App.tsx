import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { theme } from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';

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
