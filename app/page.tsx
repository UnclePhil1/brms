import React from 'react';
import StudentResults from './components/studentResults';
import UploadResultForm from './components/UploadResultForm';
import Layout from './layout';
import ExamOfficerStudentPage from './components/officerAndStudent';

export default function Home() {
  return (
    <Layout>
      {/* <div className="w-full bg-white mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-black">Check Your Results</h1>
        <StudentResults />
        <UploadResultForm />
      </div> */}
      <ExamOfficerStudentPage />
    </Layout>
  );
}
