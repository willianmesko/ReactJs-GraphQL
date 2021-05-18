import React from 'react';

import { AuthProvider } from './useAuth';
import { FavoritesProvider } from './useFavorites';
import {ProductsProvider} from './useProducts';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProductsProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
    </ProductsProvider>
  </AuthProvider>
);

export default AppProvider;
