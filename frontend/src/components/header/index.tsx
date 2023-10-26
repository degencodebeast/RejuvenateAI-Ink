'use client';

import { Link } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/state';
import RejuvenateAi from '../../images/svg/rejuvenate-logo.svg';
import RegisterForm from '../register-form';
import { useWallet, useAllWallets } from 'useink';
import dynamic from 'next/dynamic';

const ConnectWallet = dynamic(() => import('../connectWallet'), {
  ssr: false,
});

const Header = ({ bg = 'transparent' }: { bg?: string }) => {
  const { setAddress } = useAppContext();
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();
  //const { address } = useAccount()
  const address = 'yes';
  //const auth = useAuth();

  useEffect(() => {
    console.log(account, wallets);
  }, [account]);

  return (
    <section
      className={`bg-${bg} px-2 max-w-[1300px] w-full py-1 flex justify-between items-center mx-auto`}
    >
      <div>
        <Link href={'/'} textDecor={'none'}>
          <RejuvenateAi />
        </Link>
      </div>
      <>
        {account ? (
          <>
            <label
              className='btn bg-[#014421] h-[48px] px-5 lg:h-[50px] font-bold text-base lg:text-[20px] text-[#F5F5DC] rounded-xl'
              htmlFor='modal-1'
            >
              {' '}
              Register
            </label>
            <input className='modal-state' id='modal-1' type='checkbox' />
            <RegisterForm />
          </>
        ) : (
          <>
            <label
              htmlFor='modal-two'
              className='btn w-full max-w-[200px] flex items-center justify-center bg-[#014421] h-[48px] px-5 lg:h-[50px] font-bold text-base lg:text-[20px] text-[#F5F5DC] rounded-xl'
            >
              Connect Wallet
            </label>
            <input className='modal-state' id='modal-two' type='checkbox' />
            <ConnectWallet wallets={wallets} connect={connect} />
          </>
        )}
      </>
    </section>
  );
};

export default Header;
