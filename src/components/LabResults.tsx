import React from 'react';
import download from '../assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg';
import { LabResultsProps, LabResult } from '../interfaces';

const LabResults: React.FC<LabResultsProps> = ({ labResults = [] }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 ml-4 w-2xl">
      <h2 className="text-xl font-bold mb-4">Lab Results</h2>
      {labResults.length === 0 && <p>No lab results available for the selected patient.</p>}
      {labResults.length > 0 && (
        <ul className="list-none pl-0 space-y-2">
          {labResults.map((result: LabResult, index: number) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span className="flex-1"> {result}</span> 
              <img src={download} alt="Download" className="w-5 h-5" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LabResults;
