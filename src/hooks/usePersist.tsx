import React, { createContext, useContext } from 'react';

interface PersistedData {
  persitSearchField(field: string, setSearchField: Function):void;
  persistSearchValue(value: string, setSearchValue: Function):void;
  persistSearchSort(value: string, setPersistSearchSort: Function):void;
  persitedField: string;
  persistedValue: string;
  persistedSort: string;
 
 
}


const PersistContext = createContext<PersistedData>({} as PersistedData);

const PersistProvider: React.FC = ({ children }) => {
  const persistedSort = localStorage.getItem('@persistedSearchSort') || '';
  const persitedField = localStorage.getItem('@persistedSearchField') || '';
  const persistedValue = localStorage.getItem('@persistedSearchValue') || '';
  

  function persitSearchField(field: string, setSearchField: Function) : void {
    setSearchField(field)
    localStorage.setItem('@persistedSearchField', field);
  }

  function persistSearchValue(value: string, setSearchValue: Function) : void {
    setSearchValue(value)
    localStorage.setItem('@persistedSearchValue', value);
  }


  function persistSearchSort(sort: string, setPersistSearchSort: Function) : void {
    localStorage.setItem('@persistedSearchSort', sort);
  }

 




  return (
    <PersistContext.Provider
      value={{
        persitSearchField,
        persistSearchValue,
        persistSearchSort,
        persitedField,
        persistedValue, 
        persistedSort,
       
      }}
    >
      {children}
    </PersistContext.Provider>
  );
};

function usePersist(): PersistedData {
  const context = useContext(PersistContext);

  if (!context) {
    throw new Error('usePersist must be used within an SearchProvider.');
  }

  return context;
}

export { PersistProvider, usePersist };
