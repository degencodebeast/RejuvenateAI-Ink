'use client';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { UseInkProvider } from 'useink';

import { AppWrapper } from '../context/state';
import { CommunityContractProvider } from '../context/CommunityContract';
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
        <CommunityContractProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CommunityContractProvider>
      </AppWrapper>
    </UseInkProvider>
  );
}

export default Providers;
