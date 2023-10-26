'use client'

import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'
//import { NearSocialBridgeProvider } from 'near-social-bridge';
//import 'near-social-bridge/near-social-bridge.css';
import { env } from '@/config/environment'
import { getDeployments } from '@/deployments/deployments'

import { AppWrapper } from '../context/state'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppWrapper>
        <ChakraProvider>{children}</ChakraProvider>
      </AppWrapper>
    </>
  )
}

export default Providers
