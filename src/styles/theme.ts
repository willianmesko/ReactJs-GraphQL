import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    green: {
      800: '#12ac8e',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.600',
      },
      a: {
        mr: '5',
        color:"white",
        _hover: {
          color: "pink"
        },
      }
    },
  },
});
