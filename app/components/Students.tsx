'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain } from "../utils/constant";
import { getUploadedResults, storeResults, getStoredResults } from '../data'; // Import the function to fetch results

const Students: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // Define the type if you have a specific structure
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  useEffect(() => {
    if (!account) return; // Add this check
  
    const fetchResults = async () => {
      try {
        const storedResults = getStoredResults();
        if (storedResults.length > 0) {
          setResults(storedResults);
        } else {
          const allResults = await getUploadedResults(); // Fetch all results
          const studentResults = allResults.filter((result: any) => result.studentAddress.toLowerCase() === account.address.toLowerCase() && result.isVerified);
          if (studentResults.length > 0) {
            setResults(studentResults);
            console.log(studentResults);
            storeResults(studentResults);
          } else {
            setResults([]);
            setError('No verified results found for this address.');
          }
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch results. Please try again.');
      }
    };
    fetchResults();
  }, [account]); // Add account as a dependency

  // const fetchResults = async (address: string) => {
  //   try {
  //     const allResults = await getUploadedResults(); // Fetch all results
  //     const studentResults = allResults.filter((result: any) => result.studentAddress.toLowerCase() === address.toLowerCase() && result.isVerified);
  //     if (studentResults.length > 0) {
  //       setResults(studentResults);
  //       console.log(studentResults);
  //     } else {
  //       setResults([]);
  //       setError('No verified results found for this address.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to fetch results. Please try again.');
  //   }
  // };

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

      <div className="mt-8">
        {connectedAddress ? (
          <div>
            <h2 className="text-xl font-bold">Your Results</h2>
            {results.length > 0 ? (
              <table className="w-full text-left mt-4">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Course</th>
                    <th className="border px-4 py-2">Score</th>
                    <th className="border px-4 py-2">Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="border px-4 py-2">{result.course}</td>
                      <td className="border px-4 py-2">{result.score}</td>
                      <td className="border px-4 py-2">{result.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-yellow-500 mt-4">No verified results available.</div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">Please connect your wallet to view results.</div>
        )}

        {error && <div className="text-center text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Students;
