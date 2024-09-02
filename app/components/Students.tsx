'use client';

import React, { useState, useEffect } from 'react';
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { CONTRACT, client, chain } from "../utils/constant";

const Students: React.FC = () => {
  const [studentResults, setStudentResults] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const account = useActiveAccount();

  useEffect(() => {
    const fetchStudentResults = async () => {
      if (account) {
        try {
          // Use the client instance to interact with the contract
          const contract = await client.getContract(CONTRACT.address, CONTRACT.abi);
          const results = await contract.call("getAllResultsForStudent", [account.address]);
          
          if (results && results.length > 0) {
            setStudentResults(results);
          } else {
            setMessage('No results found for the student.');
          }
        } catch (error) {
          setMessage('Failed to fetch student results.');
          console.error(error);
        }
      }
    };

    fetchStudentResults();
  }, [account]);

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white">BRMS - Student Results</h1>
        <div className="flex gap-4 items-center">
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{ size: "compact" }}
          />
        </div>
      </div>

      {account ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Student Results</h2>
          {studentResults.length > 0 ? (
            <ul>
              {studentResults.map((result, index) => (
                <li key={index} className="p-2 bg-gray-700 mb-2 rounded">
                  <div>Course: {result.course}</div>
                  <div>Score: {result.score}</div>
                  <div>Grade: {result.grade}</div>
                  <div>Semester: {result.semester}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{message}</p>
          )}
        </div>
      ) : (
        <p>{message || 'Please connect your wallet to view your results.'}</p>
      )}
    </div>
  );
};

export default Students;
