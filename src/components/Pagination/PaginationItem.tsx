import { QueryLazyOptions } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  reference: string;
  handlePage(options: QueryLazyOptions<any>): void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  reference,
  handlePage,
}: PaginationItemProps) {
  const { setConfigs, configs } = useAuth();
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        color="gray.700"
        bg="green.400"
        disabled
        _disabled={{
          bgColor: 'gray:500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.400"
      _disabled={{
        bgColor: 'gray:500',
      }}
      onClick={() => {
        return (
          setConfigs({
            ...configs,
            favoritesCurrentPage:
              reference === 'favorites'
                ? number
                : configs?.favoritesCurrentPage,
            productCurrentPage:
              reference === 'products' ? number : configs?.productCurrentPage,
          }),
          handlePage({
            variables: {
              page: number,
            },
          })
        );
      }}
    >
      {number}
    </Button>
  );
}
