interface Result {
  course: string;
  score: number;
  semester: number;
  isVerified: boolean;
  studentAddress: string;
}

// Retrieve uploaded results from local storage
const getStoredResults = (): Result[] => {
  const storedData = localStorage.getItem('uploadedResults');
  return storedData ? JSON.parse(storedData) : [];
};

// Save uploaded results to local storage
const saveResults = (results: Result[]) => {
  localStorage.setItem('uploadedResults', JSON.stringify(results));
};

// Initial uploaded results data (loaded from local storage)
export let uploadedResults: Result[] = getStoredResults();

// Function to add uploaded results (to be used by Lecturer)
export const addUploadedResult = (newResult: Result) => {
  uploadedResults.push(newResult);
  saveResults(uploadedResults);
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
    saveResults(uploadedResults);
  } else {
    throw new Error('Only verified results can be updated');
  }
};

// Function to verify results by student address
export const verifyResult = (studentAddress: string) => {
  const result = uploadedResults.find((res) => res.studentAddress === studentAddress);
  if (result) {
    result.isVerified = true;
    saveResults(uploadedResults);
  }
};
