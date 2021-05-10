import {
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
  reference: string;

}
export function FilterBar({ filters, reference }: FilterBarProps) {
  const { isOpen, onClose } = useSidebarDrawer();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton mt="6" />
          <DrawerHeader>FILTERS</DrawerHeader>

          <DrawerBody>
            <SideBarNav reference={reference} filters={filters} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer >
  );
}
