'use client';
// ADD AND UPDATE LECTURER BY THE EXAMOFFICER
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

const ExamOfficerLecturerPage: React.FC = () => {
  const [lecturerAddress, setLecturerAddress] = useState<string>('');
  const [course, setCourse] = useState<string>('');
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
          Exams Officer - Add/Update Lecturer
        </h2>
        <form className="mb-6">
          <div className="mb-4">
            <label>Lecturer Address</label>
            <input
              type="text"
              placeholder="Lecturer Address"
              value={lecturerAddress}
              onChange={(e) => setLecturerAddress(e.target.value)}
              className="p-2 text-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>Course</label>
            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="p-2 text-black w-full"
              required
            />
          </div>

          {account && lecturerAddress && course && (
            <TransactionButton transaction={() => {
              return prepareContractCall({
                contract: CONTRACT,
                method: "uploadLecturer",
                params: [lecturerAddress, course]
              });
            }} onError={(err) => window.alert(err)} onTransactionConfirmed={() => window.alert("Lecturer Added/Updated Successfully")} style={{ backgroundColor: "#01A8", color: "#ffff" }}> Add/Update Lecturer</TransactionButton>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExamOfficerLecturerPage;
