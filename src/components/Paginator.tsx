import { ButtonProps } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  Paginator,
  Container,
  usePaginator,
  PageGroup,
} from 'chakra-paginator';
import { QueryLazyOptions, OperationVariables } from '@apollo/client';
interface PaginationProps {
  totalCountOfRegister: number;
  currentPage?: number;
  handlePage(options: QueryLazyOptions<OperationVariables>): void;
}
interface RouteParams {
  department: string;
}

export default function Paginators({
  totalCountOfRegister,
  handlePage,
}: PaginationProps) {
  const outerLimit = 2;
  const innerLimit = 2;
  const { department } = useParams<RouteParams>();
  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } =
    usePaginator({
      total: totalCountOfRegister,
      initialState: {
        pageSize: 3,
        currentPage: 1,
        isDisabled: false,
      },
    });

  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: 'sm',
    color: 'white',
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      opacity: '0.5',
    },
    bg: 'pink.300',
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'blue.300',
    },
    bg: 'pink.600',
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'green.200',
  };

  const handlePageChange = (nextPage: number) => {
    console.log(nextPage);
    setCurrentPage(nextPage);
    handlePage({
      variables: {
        page: nextPage,
        department,
      },
    });
  };

  return (
    <Paginator
      isDisabled={isDisabled}
      activeStyles={activeStyles}
      innerLimit={innerLimit}
      currentPage={currentPage}
      outerLimit={outerLimit}
      normalStyles={normalStyles}
      separatorStyles={separatorStyles}
      pagesQuantity={pagesQuantity}
      onPageChange={handlePageChange}
    >
      <Container align="center" justify="center" w="full" p={4}>
        <PageGroup isInline align="center" />
      </Container>
    </Paginator>
  );
}
