import React, { createContext, useContext } from 'react';
import { useUserReducer } from './reducers';

const StoreContext = createContext();

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useUserReducer({
    user: null
  });

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
