import { ButtonProps } from '@chakra-ui/react';

export const baseStyles: ButtonProps = {
  w: 7,
  fontSize: 'sm',
  color: 'white',
};

export const normalStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    opacity: '0.5',
  },
  bg: 'pink.300',
};

export const activeStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: 'blue.300',
  },
  bg: 'pink.600',
};

export const separatorStyles: ButtonProps = {
  w: 7,
  bg: 'green.200',
};
