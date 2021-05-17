import React from 'react';

import { AuthProvider } from './useAuth';
import { FavoritesProvider } from './useFavorites';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </AuthProvider>
);

export default AppProvider;
