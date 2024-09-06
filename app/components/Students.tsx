'use client';

import React from 'react';
import { ConnectButton } from "thirdweb/react";
import { client, chain, CONTRACT } from "../utils/constant";


const Students: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-white">BRMS - Student Results</h1>
        <div className="flex gap-4 items-center">
          <ConnectButton client={client}
            chain={chain}
            connectModal={{ size: "compact" }} />
        </div>
      </div>
    </div>
  );
};

export default Students;
