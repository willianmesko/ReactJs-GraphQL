import React from 'react';

import { AuthProvider } from './useAuth';
import { FavoritesProvider } from './useFavorites';
import { ProductsProvider } from './useProducts';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FavoritesProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </FavoritesProvider>
  </AuthProvider>
);

export default AppProvider;
