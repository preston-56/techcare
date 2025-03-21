import React from 'react';
import { DiagnosisListProps } from '../interfaces';

const DiagnosisList: React.FC<DiagnosisListProps> = ({ diagnosticList }) => {
  // Check if diagnosticList is an array and has elements
  if (!Array.isArray(diagnosticList) || diagnosticList.length === 0) {
    return <div>No diagnoses available for the selected patient.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 ml-4 w-full">
      <h2 className="text-xl font-bold mb-4">Diagnosis List</h2>

      {/* Title Bar with larger gray background and padding */}
      <div className="bg-gray-100 p-3 rounded-md mb-4">
        <div className="flex">
          <div className="flex-1 font-semibold text-left">Problem/Diagnosis</div>
          <div className="flex-1 font-semibold text-center">Description</div>
          <div className="flex-1 font-semibold text-right">Status</div>
        </div>
      </div>

      {/* Diagnosis Items */}
      <ul className="list-none pl-0">
        {diagnosticList.map((diagnosis, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-200"
          >
            {/* Problem/Diagnosis */}
            <div className="flex-1">
              <h3 className="font-semibold">{diagnosis.name}</h3>
            </div>

            {/* Description */}
            <div className="flex-1 text-start">
              <p>{diagnosis.description}</p>
            </div>

            {/* Status */}
            <div className="flex-1 text-right italic">
              {diagnosis.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisList;
