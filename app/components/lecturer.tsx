'use client';

import React, { useState } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { client, chain } from '../utils/constant';
import { addUploadedResult } from '../data'; // Import the function to add results

const Lecturer: React.FC = () => {
  const [studentAddress, setStudentAddress] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [semester, setSemester] = useState<number>(1);
  const account = useActiveAccount();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the result object
    const newResult = {
      studentAddress,
      course,
      score,
      semester,
      isVerified: false, // Default to unverified
    };

    // Add the result to the data store
    addUploadedResult(newResult);

    // Clear the form after submission
    setStudentAddress('');
    setCourse('');
    setScore(0);
    setSemester(1);

    alert('Result uploaded successfully!');
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lecturer - Upload Student Results</h2>
        <ConnectButton
          client={client}
          chain={chain}
          connectModal={{ size: "compact" }}
        />
      </div>
      <form onSubmit={handleUpload} className="mb-6">
        <div className="mb-4">
          <label>Student Address</label>
          <input
            type="text"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            className="p-2 text-black w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Course</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="p-2 text-black w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            className="p-2 text-black w-full"
            min="1"
            max="100"
            required
          />
        </div>
        <div className="mb-4">
          <label>Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="p-2 text-black w-full"
          >
            <option value={1}>First Semester</option>
            <option value={2}>Second Semester</option>
          </select>
        </div>
        {account ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Upload Result
          </button>
        ) : (
          <p className="text-red-500">Please connect your wallet to upload results.</p>
        )}
      </form>
    </div>
  );
};

export default Lecturer;
