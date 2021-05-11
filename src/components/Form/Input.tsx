import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error: FieldError;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref,
) => (
  <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <ChakraInput
      autoComplete="off"
      id={name}
      name={name}
      focusBorderColor="green.800"
      bgColor="gray.200"
      variant="filled"
      _hover={{ bgColor: 'gray.300' }}
      size="lg"
      ref={ref}
      {...rest}
    />

    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
);

export const Input = forwardRef(InputBase);
