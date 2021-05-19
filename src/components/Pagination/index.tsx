
import { useParams } from 'react-router-dom';
import {
  Paginator,
  Container,
  usePaginator,
  PageGroup,
} from 'chakra-paginator';
import { QueryLazyOptions, OperationVariables } from '@apollo/client';
import { normalStyles, activeStyles, separatorStyles} from './styles';

interface PaginationProps {
  totalCountOfRegister: number;
  handlePage(options: QueryLazyOptions<OperationVariables>): void;
}
interface RouteParams {
  department: string;
}

export default function Pagination({
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

  const handlePageChange = (nextPage: number) => {   
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
