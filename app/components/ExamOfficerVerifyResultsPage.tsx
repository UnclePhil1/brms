// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ConnectButton, useActiveAccount } from 'thirdweb/react';
// import { client, chain } from '../utils/constant';
// import { getUploadedResults, verifyResult, updateResult } from '../data';

// interface Result {
//   course: string;
//   score: number;
//   semester: number;
//   isVerified: boolean;
//   studentAddress: string;
// }

// const ExamOfficerVerifyResultsPage: React.FC = () => {
//   const [results, setResults] = useState<Result[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [searchResult, setSearchResult] = useState<Result | null>(null);
//   const [editableResult, setEditableResult] = useState<Result | null>(null);
//   const [verifying, setVerifying] = useState<boolean>(false);
//   const [updating, setUpdating] = useState<boolean>(false);
//   const account = useActiveAccount();

//   useEffect(() => {
//     if (account) {
//       const fetchedResults = getUploadedResults();
//       console.log('Fetched Results:', fetchedResults); // Debugging
//       setResults(fetchedResults);
//       const foundResult = fetchedResults.find((result) =>
//         result.studentAddress.toLowerCase() === account.address.toLowerCase() && result.isVerified
//       );
//       if (foundResult) {
//         setSearchResult(foundResult);
//         setEditableResult({ ...foundResult });
//       } else {
//         setSearchResult(null);
//         setEditableResult(null);
//       }
//     }
//   }, [account]);

//   const handleSearch = () => {
//     console.log('Searching for:', searchTerm); // Debugging
//     const foundResult = results.find((result) =>
//       result.studentAddress.toLowerCase().includes(searchTerm.toLowerCase()) && result.isVerified
//     );
//     if (foundResult) {
//       setSearchResult(foundResult);
//       setEditableResult({ ...foundResult });
//     } else {
//       setSearchResult(null);
//       setEditableResult(null);
//       alert('No results found for this address.');
//     }
//   };

//   const handleVerifyResult = (studentAddress: string) => {
//     setVerifying(true);
//     verifyResult(studentAddress);
//     setTimeout(() => {
//       const updatedResults = getUploadedResults();
//       console.log('Updated Results:', updatedResults); // Debugging
//       setResults(updatedResults);
//       const foundResult = updatedResults.find((result) =>
//         result.studentAddress.toLowerCase() === studentAddress.toLowerCase()
//       );
//       if (foundResult) {
//         setSearchResult(foundResult);
//         setEditableResult({ ...foundResult });
//       }
//       setVerifying(false);
//       alert('Result verified successfully!');
//     }, 1000);
//   };

//   const handleUpdate = () => {
//     if (editableResult) {
//       setUpdating(true);
//       try {
//         updateResult(editableResult);
//         setTimeout(() => {
//           const updatedResults = getUploadedResults();
//           console.log('Updated Results:', updatedResults); // Debugging
//           setResults(updatedResults);
//           const foundResult = updatedResults.find((result) =>
//             result.studentAddress.toLowerCase() === editableResult.studentAddress.toLowerCase()
//           );
//           if (foundResult) {
//             setSearchResult(foundResult);
//             setEditableResult({ ...foundResult });
//           }
//           setUpdating(false);
//           alert('Result updated successfully!');
//         }, 1000);
//       } catch (error) {
//         setUpdating(false);
//         alert('Update unsuccessful');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
//       <div className="flex justify-between items-center gap-4 p-2">
//         <h2 className="text-2xl font-bold mb-4">Verify and Update Student Results</h2>
//         <div className="flex gap-4 items-center">
//           <ConnectButton client={client} chain={chain} connectModal={{ size: 'compact' }} />
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="mb-4 flex items-center gap-2">
//           <input
//             type="text"
//             placeholder="Search by Student Address"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 text-black w-full rounded-md"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>

//         {searchResult && editableResult && (
//           <div className="mt-4">
//             <table className="w-full text-left mt-4">
//               <thead>
//                 <tr>
//                   <th className="border px-4 py-2">Address</th>
//                   <th className="border px-4 py-2">Course</th>
//                   <th className="border px-4 py-2">Score</th>
//                   <th className="border px-4 py-2">Semester</th>
//                   <th className="border px-4 py-2">Status</th>
//                   <th className="border px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border px-4 py-2">
//                     {editableResult.studentAddress}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <input
//                       type="text"
//                       value={editableResult.course}
//                       onChange={(e) => setEditableResult({ ...editableResult, course: e.target.value })}
//                       className="p-2 text-black"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">
//                     <input
//                       type="number"
//                       value={editableResult.score}
//                       onChange={(e) => setEditableResult({ ...editableResult, score: parseInt(e.target.value) })}
//                       className="p-2 text-black"
//                       min="1"
//                       max="100"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">
//                     <select
//                       value={editableResult.semester}
//                       onChange={(e) => setEditableResult({ ...editableResult, semester: Number(e.target.value) })}
//                       className="p-2 text-black"
//                     >
//                       <option value={1}>First Semester</option>
//                       <option value={2}>Second Semester</option>
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2">
//                     {editableResult.isVerified ? (
//                       <span className="text-green-500">Verified</span>
//                     ) : (
//                       <span className="text-yellow-500">Unverified</span>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2">
//                     {!editableResult.isVerified && (
//                       <button
//                         onClick={() => handleVerifyResult(editableResult.studentAddress)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//                         disabled={verifying}
//                       >
//                         {verifying ? 'Verifying...' : 'Verify'}
//                       </button>
//                     )}
//                     {editableResult.isVerified && (
//                       <button
//                         onClick={handleUpdate}
//                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2"
//                         disabled={updating}
//                       >
//                         {updating ? 'Updating...' : 'Update'}
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExamOfficerVerifyResultsPage;

'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { client, chain } from '../utils/constant';
import { getUploadedResults, verifyResult, updateResult } from '../data'; // Import the function to update results

interface Result {
  course: string;
  score: number;
  semester: number;
  isVerified: boolean;
  studentAddress: string;
}

const ExamOfficerVerifyResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Result | null>(null);
  const [editableResult, setEditableResult] = useState<Result | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      // Fetch uploaded results from data.ts
      const fetchedResults = getUploadedResults();
      setResults(fetchedResults);
    }
  }, [account]);

  const handleSearch = () => {
    const foundResult = results.find((result) =>
      result.studentAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundResult) {
      setSearchResult(foundResult);
      setEditableResult({ ...foundResult });
    } else {
      setSearchResult(null);
      alert('No results found for this address.');
    }
  };

  const handleVerifyResult = (studentAddress: string) => {
    setVerifying(true);
    verifyResult(studentAddress);
    setTimeout(() => {
      const updatedResults = getUploadedResults();
      setResults(updatedResults);
      setVerifying(false);
      alert('Result verified successfully!');
    }, 1000);
  };

  const handleUpdate = () => {
    if (editableResult) {
      setUpdating(true);
      updateResult(editableResult);
      setTimeout(() => {
        const updatedResults = getUploadedResults();
        setResults(updatedResults);
        setUpdating(false);
        alert('Result updated successfully!');
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h2 className="text-2xl font-bold mb-4">Verify and Update Student Results</h2>
        <div className="flex gap-4 items-center">
          <ConnectButton client={client} chain={chain} connectModal={{ size: 'compact' }} />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by Student Address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-black w-full rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        {searchResult && editableResult && (
          <div className="mt-4">
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Score</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={editableResult.course}
                      onChange={(e) => setEditableResult({ ...editableResult, course: e.target.value })}
                      className="p-2 text-black"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={editableResult.score}
                      onChange={(e) => setEditableResult({ ...editableResult, score: parseInt(e.target.value) })}
                      className="p-2 text-black"
                      min="1"
                      max="100"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      value={editableResult.semester}
                      onChange={(e) => setEditableResult({ ...editableResult, semester: Number(e.target.value) })}
                      className="p-2 text-black"
                    >
                      <option value={1}>First Semester</option>
                      <option value={2}>Second Semester</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    {editableResult.isVerified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <span className="text-yellow-500">Unverified</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {!editableResult.isVerified && (
                      <button
                        onClick={() => handleVerifyResult(editableResult.studentAddress)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        disabled={verifying}
                      >
                        {verifying ? 'Verifying...' : 'Verify'}
                      </button>
                    )}
                    {editableResult.isVerified && (
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2"
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Update'}
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamOfficerVerifyResultsPage;
