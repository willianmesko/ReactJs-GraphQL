import { Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegister: number;
  registerPerPage?: number;
  currentPage?: number;
  reference: string;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegister,
  registerPerPage = 3,
  currentPage = 1,
  reference,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegister / registerPerPage);

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
        currentPage,
        Math.min(currentPage + siblingsCount, lastPage)
      )
      : [];

  return (
    <>
      <Stack direction="row" mt="8" justify="space-between" align="center">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem reference={reference} number={1} />
            {currentPage > (2 + siblingsCount && <Text>...</Text>)}
          </>
        )}
        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return <PaginationItem reference={reference} key={page} number={page} />;
          })}

        <PaginationItem reference={reference} number={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return <PaginationItem reference={reference} key={page} number={page} />;
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            <PaginationItem reference={reference} number={lastPage} />
            {currentPage + 1 + siblingsCount < lastPage && <Text>...</Text>}
          </>
        )}
      </Stack>
    </>
  );
}
