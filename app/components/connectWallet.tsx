'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet} className='bg-black text-white rounded-lg mt-2 p-2'>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;
