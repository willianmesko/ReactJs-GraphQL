import { Box, Stack, Text } from '@chakra-ui/react';
import { Filter } from '../../interfaces/Filters.interface';
import { useApp } from '../../hooks/useContext';

interface SideBarNavProps {
  filters: Filter[];
  reference: string;
}

export function SideBarNav({ filters, reference }: SideBarNavProps) {
  const { setConfigs, configs } = useApp();

  return (
    <>
      <Text
        onClick={() =>
          setConfigs({
            ...configs,
            favoritesQueryFilter:
              reference === 'favorites' ? '' : configs?.favoritesQueryFilter,
            productsQueryFilter:
              reference === 'products' ? '' : configs?.productsQueryFilter,
            favoritesCurrentPage:
              reference === 'favorites' ? 1 : configs?.favoritesCurrentPage,
            productCurrentPage:
              reference === 'products' ? 1 : configs?.productCurrentPage,
          })
        }
        _hover={{ cursor: 'pointer' }}
        fontSize="20"
        mb="10"
      >
        {' '}
        Clear Filter
      </Text>
      <Stack spacing="12" align="flex-start">
        <Box>
          {filters &&
            filters.map((filter, i) => (
              <>
                <Text
                  key={filter.name + i}
                  fontWeight="bold"
                  mb="4px"
                  fontSize="1xl"
                >
                  {filter.name}
                </Text>
                {filter.options.map((option, fi) => (
                  <Text
                    key={option + i}
                    mb="2px"
                    _hover={{
                      cursor: 'pointer',
                      color: 'green.800',
                    }}
                    onClick={() =>
                      setConfigs({
                        ...configs,
                        favoritesQueryFilter:
                          reference === 'favorites'
                            ? `${filter.name}?${option}`
                            : configs?.favoritesQueryFilter,
                        productsQueryFilter:
                          reference === 'products'
                            ? `${filter.name}?${option}`
                            : configs?.productsQueryFilter,
                        favoritesCurrentPage:
                          reference === 'favorites'
                            ? 1
                            : configs?.favoritesCurrentPage,
                        productCurrentPage:
                          reference === 'products'
                            ? 1
                            : configs?.productCurrentPage,
                      })
                    }
                  >
                    {option}
                  </Text>
                ))}
              </>
            ))}
        </Box>
      </Stack>
    </>
  );
}
