import React from 'react';

import { AuthProvider } from './useContext';
import { SideBarDrawerProvider } from './sideBarDrawerContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SideBarDrawerProvider>{children}</SideBarDrawerProvider>
  </AuthProvider>
);

export default AppProvider;
