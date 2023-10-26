'use client';
import React, { useEffect } from 'react';

interface connectWalletProps {
  wallets: any;
  connect: any;
}
const ConnectWallet = ({ wallets, connect }: connectWalletProps) => {
  return (
    <div className='modal'>
      <label className='modal-overlay' htmlFor='modal-two'></label>
      <div className='modal-content flex flex-col gap-5 max-w-[90%] lg:max-w-[60%] w-full'>
        <label
          htmlFor='modal-two'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        >
          ✕
        </label>
        <h2 className='text-[45px] text-center'>Wallets</h2>
        <div className='w-full flex justify-between'>
          <li className='w-full list-none'>
            <ul className='flex flex-col md:flex-row justify-between items-center gap-5 px-5 w-full list-none pb-10'>
              {wallets.map((w: any) => {
                return (
                  <li key={w.title} className='flex flex-col items-center'>
                    {w?.installed ? (
                      <button
                        onClick={() => connect(w.extensionName)}
                        className='flex flex-col items-center gap-3'
                      >
                        <img
                          src={w.logo.src}
                          alt={w.logo.alt}
                          className='h-10 w-10'
                        />
                        Connect to {w.title}
                      </button>
                    ) : (
                      <a
                        href={w.installUrl}
                        className='flex flex-col items-center gap-3'
                      >
                        <img
                          src={w.logo.src}
                          alt={w.logo.alt}
                          className='h-10 w-10'
                        />
                        Install {w.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
