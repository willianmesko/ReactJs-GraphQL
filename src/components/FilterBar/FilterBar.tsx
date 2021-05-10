import {
  Box,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '../../hooks/sideBarDrawerContext';
import { Filter } from '../../interfaces/Filters.interface';
import { SideBarNav } from './SideBarNav';

interface FilterBarProps {
  filters: Filter[];
  setQueryFilter(query: string): void;
}
export function FilterBar({ filters, setQueryFilter }: FilterBarProps) {
  const { isOpen, onClose } = useSidebarDrawer();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton mt="6" />
          <DrawerHeader>FILTERS</DrawerHeader>
          <DrawerBody>
            <SideBarNav setQueryFilter={setQueryFilter} filters={filters} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
