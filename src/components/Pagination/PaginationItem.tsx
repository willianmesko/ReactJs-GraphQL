import { Button } from '@chakra-ui/react';
import { useApp } from '../../hooks/useContext';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  reference: string;
}

export function PaginationItem({
  isCurrent = false,
  number,
  reference,
}: PaginationItemProps) {
  const { setConfigs, configs } = useApp();
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
      onClick={() =>
        setConfigs({
          ...configs,
          favoritesCurrentPage:
            reference === 'favorites' ? number : configs?.favoritesCurrentPage,
          productCurrentPage:
            reference === 'products' ? number : configs?.productCurrentPage,
        })
      }
    >
      {number}
    </Button>
  );
}
