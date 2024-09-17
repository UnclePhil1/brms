'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain } from "../utils/constant";
import { getUploadedResults, storeResults, getStoredResults } from '../data'; // Import necessary functions

const Students: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // Holds the verified results for the connected account
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();  // Track the connected account (wallet)

  useEffect(() => {
    if (!account) return; // If no account is connected, return early
    
    // Fetch only the verified result of the connected wallet address
    const fetchResults = async () => {
      try {
        // Get stored results first (if cached)
        const storedResults = getStoredResults();
        
        if (storedResults.length > 0) {
          // Use cached results if available
          const studentResults = storedResults.filter((result: any) =>
            result.studentAddress.toLowerCase() === account.address.toLowerCase() && result.isVerified
          );
          
          if (studentResults.length > 0) {
            setResults(studentResults);
          } else {
            // setError('No verified results found for this address.');
            setResults([]);  // Clear results if none found
          }
        } else {
          const allResults = await getUploadedResults(); // Fetch all results from server
          
          // Filter only the verified results for the connected wallet address
          const studentResults = allResults.filter((result: any) => 
            result.studentAddress.toLowerCase() === account.address.toLowerCase() && result.isVerified
          );
          
          if (studentResults.length > 0) {
            setResults(studentResults);  // Set the student's verified results
            storeResults(studentResults);  // Cache the results for future use
          } else {
            setResults([]);
            // setError('No verified results found for this address.'); // Show error if no verified results found
          }
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch results. Please try again.'); // Show error if fetching fails
      }
    };

    fetchResults();
  }, [account]);  // Run this effect every time the account changes (wallet is connected)

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white">BRMS - Student Results</h1>
        <div className="flex gap-4 items-center">
          <ConnectButton client={client} chain={chain} connectModal={{ size: "compact" }} />
        </div>
      </div>

      <div className="mt-8">
        {account ? (
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
      </div>
    </div>
  );
};

export default Students;
