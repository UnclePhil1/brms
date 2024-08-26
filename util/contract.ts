import { ethers, JsonRpcProvider } from 'ethers';
import contractABI from './contractABI.json';

const provider = new JsonRpcProvider('https://api-sepolia.etherscan.io/api');
const contractAddress = '0x7c14e3e68f5ca77acf69f836bd561221a4c6d80d';

// Function to upload student result to the blockchain
export const uploadResult = async (studentAddress: string, course: string, score: number, semester: number) => {
  try {
    const signer = await provider.getSigner();  // Await here to get the signer
    const contract = new ethers.Contract(contractAddress, contractABI, signer);  // Create a contract instance with the signer

    await contract.uploadResult(studentAddress, course, score, semester);
    console.log('Result uploaded successfully');
  } catch (error) {
    console.error('Error uploading result:', error);
    throw error;  // Rethrow the error after logging
  }
};

// Function to get the Exams Officer's address
export const getExamsOfficerAddress = async (): Promise<string> => {
  try {
    const signer = await provider.getSigner();  // Get the signer if you need transactions signed
    const contract = new ethers.Contract(contractAddress, contractABI, signer);  // Contract instance with signer

    return await contract.examsOfficer();
  } catch (error) {
    console.error('Error getting Exams Officer address:', error);
    throw error;
  }
};

// Function to get student results based on the connected address
export const getStudentResultForStudent = async (studentAddress: string): Promise<any[]> => {
  try {
    const signer = await provider.getSigner();  // Get the signer if the method requires signing
    const contract = new ethers.Contract(contractAddress, contractABI, signer);  // Contract instance with signer

    return await contract.getStudentResultForStudent(studentAddress);
  } catch (error) {
    console.error('Error fetching student results:', error);
    throw error;
  }
};
