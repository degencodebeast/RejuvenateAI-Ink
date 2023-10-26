'use client';
import { createContext, useContext, useState } from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { stateContextType } from '../types/state';

const contextDefaultValue: stateContextType = {
  allTokensData: {},
  address: '',
  setAllTokenData: () => null,
  setAddress: () => null,
  loading: false,
  setLoading: () => null,
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<stateContextType>(contextDefaultValue);

export function AppWrapper({ children }: StateContextProviderProps) {
  const [allTokensData, setAllTokenData] = useState<any>();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sharedState = {
    allTokensData,
    setAllTokenData,
    address,
    setAddress,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
