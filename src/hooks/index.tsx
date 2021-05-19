import React from 'react';

import { AuthProvider } from './useAuth';
import { FavoritesProvider } from './useFavorites';
import { ProductsProvider } from './useProducts';
import { PersistProvider } from './usePersist';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <PersistProvider>
      <FavoritesProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </FavoritesProvider>
    </PersistProvider>
  </AuthProvider>
);

export default AppProvider;
