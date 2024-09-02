import { createThirdwebClient, defineChain, getContract } from "thirdweb";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: CLIENT_ID as string,
});

export const chain = defineChain(11155111);

const contractAddress = "0x7c14E3E68F5Ca77AcF69F836Bd561221A4C6D80D";

const contractAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "student", type: "address" },
      { indexed: false, internalType: "uint256", name: "semester", type: "uint256" },
      { indexed: false, internalType: "string", name: "course", type: "string" },
      { indexed: false, internalType: "uint256", name: "score", type: "uint256" },
      { indexed: false, internalType: "string", name: "grade", type: "string" },
    ],
    name: "ResultUploaded",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_newExamsOfficer", type: "address" }],
    name: "changeExamsOfficer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "examsOfficer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_student", type: "address" }],
    name: "getAllResultsForExamsOfficer",
    outputs: [
      {
        components: [
          { internalType: "string", name: "course", type: "string" },
          { internalType: "uint256", name: "score", type: "uint256" },
          { internalType: "string", name: "grade", type: "string" },
          { internalType: "uint256", name: "semester", type: "uint256" },
          { internalType: "bool", name: "isVerified", type: "bool" },
        ],
        internalType: "struct BRMS.Result[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllResultsForStudent",
    outputs: [
      {
        components: [
          { internalType: "string", name: "course", type: "string" },
          { internalType: "uint256", name: "score", type: "uint256" },
          { internalType: "string", name: "grade", type: "string" },
          { internalType: "uint256", name: "semester", type: "uint256" },
          { internalType: "bool", name: "isVerified", type: "bool" },
        ],
        internalType: "struct BRMS.Result[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_student", type: "address" }],
    name: "getAllResultsForUniversity",
    outputs: [
      {
        components: [
          { internalType: "string", name: "course", type: "string" },
          { internalType: "uint256", name: "score", type: "uint256" },
          { internalType: "string", name: "grade", type: "string" },
          { internalType: "uint256", name: "semester", type: "uint256" },
          { internalType: "bool", name: "isVerified", type: "bool" },
        ],
        internalType: "struct BRMS.Result[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lecturers",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "students",
    outputs: [{ internalType: "address", name: "student", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "university",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_student", type: "address" },
      { internalType: "string", name: "_course", type: "string" },
      { internalType: "uint256", name: "_score", type: "uint256" },
      { internalType: "uint256", name: "_semester", type: "uint256" },
    ],
    name: "updateResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_university", type: "address" }],
    name: "updateUniversity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_lecturer", type: "address" },
      { internalType: "string", name: "_course", type: "string" },
    ],
    name: "uploadLecturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_student", type: "address" },
      { internalType: "uint256", name: "_score", type: "uint256" },
      { internalType: "string", name: "_course", type: "string" },
      { internalType: "uint256", name: "_semester", type: "uint256" },
    ],
    name: "uploadResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_student", type: "address" },
      { internalType: "string", name: "_course", type: "string" },
      { internalType: "uint256", name: "_semester", type: "uint256" },
    ],
    name: "verifyResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const CONTRACT = getContract({
  client: client,
  chain: chain,
  address: contractAddress,
  abi: contractAbi,
});
