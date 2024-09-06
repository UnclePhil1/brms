'use client';

import React, { useState, useEffect } from 'react';
import { CONTRACT } from '../utils/constant';

interface Result {
  course: string;
  score: number;
  grade: string;
  semester: number;
  studentAddress: string;
}

const UniversityPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllVerifiedResults();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((result) =>
        result.studentAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, results, fetchAllVerifiedResults]);

  const fetchAllVerifiedResults = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with actual logic to fetch verified results from your contract
      const studentsAddresses = await getAllStudentsAddresses();
      const allResults: Result[] = [];

      for (const address of studentsAddresses) {
        const studentResults = await CONTRACT.getAllResultsForUniversity([
          address,
        ]);

        const formattedResults = studentResults
          .filter((res: any) => res.isVerified) // Only verified results
          .map((res: any) => ({
            course: res.course,
            score: Number(res.score),
            grade: res.grade,
            semester: Number(res.semester),
            studentAddress: address,
          }));

        allResults.push(...formattedResults);
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
    // Implement logic to fetch all student addresses
    return ['0xStudentAddress1', '0xStudentAddress2']; // Mock data
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">University - Verified Student Results</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Student Address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 text-black w-full rounded-md border border-gray-500"
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UniversityPage;
