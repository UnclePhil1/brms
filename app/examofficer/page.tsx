'use client';

import React, { useState } from 'react';
import ExamOfficerLecturerPage from '../components/ExamOfficerLecturerPage';
import ExamOfficerUniversityPage from '../components/ExamOfficerUniversityPage';
import ExamOfficerVerifyResultsPage from '../components/ExamOfficerVerifyResultsPage';

const ExamOfficerPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('verifyResults');

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white text-3xl font-bold">BRMS - Exam Officer Dashboard</h1>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${activePage === 'lecturer' ? 'bg-blue-500' : 'bg-gray-600'}`}
            onClick={() => setActivePage('lecturer')}
          >
            Lecturer
          </button>
          <button
            className={`px-4 py-2 rounded ${activePage === 'university' ? 'bg-blue-500' : 'bg-gray-600'}`}
            onClick={() => setActivePage('university')}
          >
            University
          </button>
          <button
            className={`px-4 py-2 rounded ${activePage === 'verifyResults' ? 'bg-blue-500' : 'bg-gray-600'}`}
            onClick={() => setActivePage('verifyResults')}
          >
            Verify Results
          </button>
        </div>
      </div>

      <div className="mt-8">
        {activePage === 'lecturer' && <ExamOfficerLecturerPage />}
        {activePage === 'university' && <ExamOfficerUniversityPage />}
        {activePage === 'verifyResults' && <ExamOfficerVerifyResultsPage />}
      </div>
    </div>
  );
};

export default ExamOfficerPage;
