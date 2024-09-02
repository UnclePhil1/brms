'use client'

import React, { useState } from 'react';
import { ConnectButton, TransactionButton, useActiveAccount } from "thirdweb/react";
import { client, chain, CONTRACT } from "../utils/constant";
import { createWallet } from "thirdweb/wallets";
import { prepareContractCall } from 'thirdweb';

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

const ExamOfficerUniversityPage: React.FC = () => {
  const [universityAddress, setUniversityAddress] = useState<string>('');
  const account = useActiveAccount();

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white">BRMS</h1>
        <div className="flex gap-4 items-center">
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{ size: "compact" }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Exams Officer - Add/Update University
        </h2>
        <form className="mb-6">
          <div className="mb-4">
            <label>University Address</label>
            <input
              type="text"
              placeholder="University Address"
              value={universityAddress}
              onChange={(e) => setUniversityAddress(e.target.value)}
              className="p-2 text-black w-full"
              required
            />
          </div>

          {account && universityAddress && (
            <TransactionButton transaction={() => {
              return prepareContractCall({
                contract: CONTRACT,
                method: "updateUniversity",
                params: [universityAddress]
              });
            }} onError={(err) => window.alert(err)} onTransactionConfirmed={() => window.alert("University Added/Updated Successfully")} style={{ backgroundColor: "#01A8", color: "#ffff" }}> Add/Update University</TransactionButton>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExamOfficerUniversityPage;
