import Cookies from 'js-cookie';

interface Result {
  course: string;
  score: number;
  semester: number;
  isVerified: boolean;
  studentAddress: string;
}

// Retrieve uploaded results from cookies
export const getStoredResults = (): Result[] => {
  const storedData = Cookies.get('uploadedResults');
  return storedData ? JSON.parse(storedData) : [];
};

// Store uploaded results in cookies
export const storeResults = (results: Result[]) => {
  Cookies.set('uploadedResults', JSON.stringify(results));
};

// // Save uploaded results to local storage
// const saveResults = (results: Result[]) => {
//   localStorage.setItem('uploadedResults', JSON.stringify(results));
// };

// Initial uploaded results data (loaded from local storage)
export let uploadedResults: Result[] = getStoredResults();

// Function to add uploaded results (to be used by Lecturer)
export const addUploadedResult = (newResult: Result) => {
  uploadedResults.push(newResult);
  storeResults(uploadedResults);
};

// Function to fetch all uploaded results
export const getUploadedResults = (): Result[] => {
  return uploadedResults;
};

// Function to update a result by student address
export const updateResult = (updatedResult: Result) => {
  const index = uploadedResults.findIndex((res) => res.studentAddress === updatedResult.studentAddress);
  if (index !== -1 && uploadedResults[index].isVerified) {
    uploadedResults[index] = updatedResult;
    storeResults(uploadedResults);
  } else {
    throw new Error('Only verified results can be updated');
  }
};

// Function to verify results by student address
export const verifyResult = (studentAddress: string) => {
  const result = uploadedResults.find((res) => res.studentAddress === studentAddress);
  if (result) {
    result.isVerified = true;
    storeResults(uploadedResults);
  }
};
