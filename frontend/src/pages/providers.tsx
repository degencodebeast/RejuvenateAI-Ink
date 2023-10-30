'use client';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { UseInkProvider } from 'useink';

import { AppWrapper } from '../context/state';
import {
  RococoContractsTestnet,
  ShibuyaTestnet,
  AlephTestnet,
} from 'useink/chains';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UseInkProvider
      config={{
        dappName: 'RejuvenateAI',
        chains: [RococoContractsTestnet, ShibuyaTestnet, AlephTestnet],
      }}
    >
      <AppWrapper>
        <ChakraProvider>{children}</ChakraProvider>
      </AppWrapper>
    </UseInkProvider>
  );
}

export default Providers;
