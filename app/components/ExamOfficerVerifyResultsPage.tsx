'use client';

// Verify Student Results
import React, { useState, useEffect } from 'react';
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from 'thirdweb/react';
import { client, chain, CONTRACT } from '../utils/constant';
import { createWallet } from 'thirdweb/wallets';
import { ethers } from 'ethers';

const wallets = [
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
  createWallet('io.rabby'),
  createWallet('io.zerion.wallet'),
];

interface Result {
  course: string;
  score: number;
  grade: string;
  semester: number;
  isVerified: boolean;
  studentAddress: string;
}

const ExamOfficerVerifyResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((result) =>
        result.studentAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }

    if (account) {
      fetchAllResults();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, results, account]);

  // Fetch all student results from the contract
  const fetchAllResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const studentsAddresses = await getAllStudentsAddresses();
      const allResults: Result[] = [];

      for (const address of studentsAddresses) {
        // const studentResults = await contract.getAllResultsForExamsOfficer(address);
        
        // const formattedResults = studentResults.map((res: any) => ({
        //   course: res.course,
        //   score: Number(res.score),
        //   grade: res.grade,
        //   semester: Number(res.semester),
        //   isVerified: res.isVerified,
        //   studentAddress: address,
        // }));

        // allResults.push(...formattedResults);
      }

      setResults(allResults);
      setFilteredResults(allResults);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAllStudentsAddresses = async (): Promise<string[]> => {
    // Fetch all student addresses from the contract
    return ['0xStudentAddress1', '0xStudentAddress2']; // Placeholder
  };

  // Verify the student result by calling the contract
  const handleVerifyResult = async (
    studentAddress: string,
    course: string,
    semester: number
  ) => {
    setVerifying(true);
    setError(null);
    try {
      // const transaction = await contract.verifyResult(studentAddress, course, BigInt(semester));
      // await transaction.wait();
      alert('Result verified successfully!');
      fetchAllResults(); // Refresh the list after verification
    } catch (err) {
      console.error(err);
      setError('Failed to verify result. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white text-3xl font-bold">BRMS - Exam Officer Dashboard</h1>
        <div className="flex gap-4 items-center">
          <ConnectButton client={client} chain={chain} connectModal={{ size: 'compact' }} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Verify Student Results</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Student Address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-black w-full rounded-md"
          />
        </div>

        {loading ? (
          <div className="text-center mt-8">Loading results...</div>
        ) : error ? (
          <div className="text-center mt-8 text-red-500">{error}</div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center mt-8">No results found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Student Address</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Score</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="border px-4 py-2">{result.studentAddress}</td>
                  <td className="border px-4 py-2">{result.course}</td>
                  <td className="border px-4 py-2">{result.score}</td>
                  <td className="border px-4 py-2">{result.grade}</td>
                  <td className="border px-4 py-2">{result.semester}</td>
                  <td className="border px-4 py-2">
                    {result.isVerified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <span className="text-yellow-500">Unverified</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {!result.isVerified ? (
                      <button
                        onClick={() =>
                          handleVerifyResult(
                            result.studentAddress,
                            result.course,
                            result.semester
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        disabled={verifying}
                      >
                        {verifying ? 'Verifying...' : 'Verify'}
                      </button>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExamOfficerVerifyResultsPage;
