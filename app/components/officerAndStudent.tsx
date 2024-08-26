'use client';

import React, { useEffect, useState } from 'react';
import {ConnectButton, TransactionButton, useActiveAccount} from "thirdweb/react";
import {client, chain, CONTRACT } from "../utils/constant";
import { createWallet } from "thirdweb/wallets";
import { prepareContractCall } from 'thirdweb';
// import { ethers } from 'ethers';
// import { uploadResult, getStudentResultForStudent, getExamsOfficerAddress } from '../../util/contract';


const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
const ExamOfficerStudentPage: React.FC = () => {
    // const [account, setAccount] = useState<string | null>(null);
    const [isExamsOfficer, setIsExamsOfficer] = useState<boolean>(false);
    const [studentResults, setStudentResults] = useState<any[]>([]);
    const [studentAddress, setStudentAddress] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [semester, setSemester] = useState<number>(1); // Default to 1 (First Semester)
    const [message, setMessage] = useState<string>('');
    const account = useActiveAccount();

    // useEffect(() => {
    //     const checkIfWalletIsConnected = async () => {
    //         if (window.ethereum) {
    //             try {
    //                 const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //                 if (accounts.length > 0) {
    //                     const connectedAccount = accounts[0];
    //                     setAccount(connectedAccount);
    //                     checkIfExamsOfficer(connectedAccount);
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking wallet connection:', error);
    //                 setMessage('Failed to check wallet connection.');
    //             }
    //         } else {
    //             console.log('Please install MetaMask!');
    //             setMessage('Please install MetaMask to use this application.');
    //         }
    //     };

    //     checkIfWalletIsConnected();
    // }, []);

    // const checkIfExamsOfficer = async (connectedAccount: string) => {
    //     try {
    //         const examsOfficerAddress = await getExamsOfficerAddress();
    //         if (connectedAccount.toLowerCase() === examsOfficerAddress.toLowerCase()) {
    //             setIsExamsOfficer(true);
    //         } else {
    //             fetchStudentData(connectedAccount);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching exams officer address:', error);
    //         setMessage('Failed to fetch exams officer address.');
    //     }
    // };

    // const fetchStudentData = async (address: string) => {
    //     try {
    //         const results = await getStudentResultForStudent(address);
    //         if (results.length > 0) {
    //             setStudentResults(results);
    //             setMessage('Student results loaded successfully.');
    //         } else {
    //             setMessage('No results found for this student.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching student data:', error);
    //         setMessage('Failed to fetch student data.');
    //     }
    // };

    // const handleUploadResult = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (studentAddress && course && score && semester) {
    //         try {
    //             await uploadResult(studentAddress, course, score, semester);
    //             setMessage('Result uploaded successfully!');
    //             setStudentAddress('');
    //             setCourse('');
    //             setScore(0);
    //             setSemester(1); // Reset to 1 (First Semester)
    //         } catch (error) {
    //             console.error('Error uploading result:', error);
    //             setMessage('Failed to upload result.');
    //         }
    //     } else {
    //         setMessage('Please fill all fields.');
    //     }
    // };

    // const connectWallet = async () => {
    //     if (window.ethereum) {
    //         try {
    //             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //             const connectedAccount = accounts[0];
    //             setAccount(connectedAccount);
    //             checkIfExamsOfficer(connectedAccount);
    //         } catch (error) {
    //             console.error('Error connecting wallet:', error);
    //             setMessage('Failed to connect wallet.');
    //         }
    //     } else {
    //         console.log('Please install MetaMask!');
    //         setMessage('Please install MetaMask to use this application.');
    //     }
    // };

    // const disconnectWallet = () => {
    //     setAccount(null);
    //     setIsExamsOfficer(false);
    //     setStudentResults([]);
    //     setMessage('');
    // };

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
            {/* {account ? (
                        <>
                            <button
                                onClick={disconnectWallet}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                Disconnect Wallet
                            </button>
                            <p className="mb-4">Connected: {account.substring(0, 3) + "..." + account.substring(account.length - 2)}</p>
                        </>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Connect Wallet
                        </button>
                    )} */}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Exams Officer - Upload Student Results
          </h2>
          <form
            // onSubmit={handleUploadResult}
            className="mb-6"
          >
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
                  // Ensure score is within the range of 1 to 100
                  if (newScore >= 1 && newScore <= 100) {
                    setScore(newScore);
                  } else if (newScore < 1) {
                    setScore(1); // Set to minimum if below range
                  } else if (newScore > 100) {
                    setScore(100); // Set to maximum if above range
                  }
                }}
                className="p-2 text-black w-full"
                min="1" // Minimum value for input
                max="100" // Maximum value for input
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
            {/* <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!account && !course && !score && !studentAddress}
            >
              Upload Result
            </button> */}
{ account && course && score && studentAddress && (

  
  <TransactionButton transaction={() => {
              return prepareContractCall({
                  contract: CONTRACT,
                  method: "uploadResult",
                  params: [studentAddress, BigInt(score), course, BigInt(semester)]
                });
              }} onError={(err) => window.alert(err)} onTransactionConfirmed={() => window.alert("Successfully uploaded result ")} style={{backgroundColor: "#01A8", color: "#ffff"}}> Upload Result</TransactionButton>
            )
            }
          </form>
        </div>

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

        {message && <p className="mt-4">{message}</p>}
      </div>
    );
};

export default ExamOfficerStudentPage;
