'use client';

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

const Lecturer: React.FC = () => {
  const [studentAddress, setStudentAddress] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [semester, setSemester] = useState<number>(1); // Default to 1 (First Semester)
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
          Exams Officer - Upload Student Results
        </h2>
        <form className="mb-6">
          <div className="mb-4">
            <label>Student Address</label>
            <input
              type="text"
              placeholder="Student Address"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
              className="p-2 text-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>Student Course</label>
            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="p-2 text-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>Student Score</label>
            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => {
                const newScore = parseInt(e.target.value);
                if (newScore >= 1 && newScore <= 100) {
                  setScore(newScore);
                } else if (newScore < 0) {
                  setScore(1); 
                } else if (newScore > 100) {
                  setScore(100);
                }
              }}
              className="p-2 text-black w-full"
              min="1"
              max="100"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">Semester</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="1"
                  checked={semester === 1}
                  onChange={() => setSemester(1)}
                  className="mr-2"
                />
                First Semester
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="2"
                  checked={semester === 2}
                  onChange={() => setSemester(2)}
                  className="mr-2"
                />
                Second Semester
              </label>
            </div>
          </div>

          {account && course && score && studentAddress && (
            <TransactionButton
              transaction={() => {
                return prepareContractCall({
                  contract: CONTRACT,
                  method: "uploadResult",
                  params: [studentAddress, BigInt(score), course, BigInt(semester)],
                });
              }}
              onError={(err) => window.alert(err)}
              onTransactionConfirmed={() => window.alert("Successfully uploaded result")}
              style={{ backgroundColor: "#01A8", color: "#ffff" }}
            >
              Upload Result
            </TransactionButton>
          )}
        </form>
      </div>
    </div>
  );
};

export default Lecturer;
