import { useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { Filter } from '../../interfaces/Filters.interface';

interface SideBarNavProps {
  filters: Filter[];
  setQueryFilter(query: string): void;
}

export function SideBarNav({ filters, setQueryFilter }: SideBarNavProps) {
  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        {filters &&
          filters.map((filter) => {
            return (
              <>
                <Text
                  key={filter.name}
                  fontWeight="bold"
                  mb="4px"
                  fontSize="1xl"
                >
                  {filter.name}
                </Text>
                {filter.options.map((option) => {
                  return (
                    <Text
                      key={option}
                      mb="2px"
                      _hover={{
                        cursor: 'pointer',
                      }}
                      onClick={() => setQueryFilter(`${filter.name}?${option}`)}
                    >
                      {option}
                    </Text>
                  );
                })}
              </>
            );
          })}
      </Box>
    </Stack>
  );
}
