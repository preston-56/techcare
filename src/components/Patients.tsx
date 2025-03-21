import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaSearch } from "react-icons/fa";
import { Patient, PatientsProps } from "../interfaces";

const Patients: React.FC<PatientsProps> = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa("coalition:skills-test")
            }
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && Array.isArray(data)) {
          setPatients(data.slice(0, 5)); // Get the first 5 patients
        } else if (data && data.patients) {
          setPatients(data.patients.slice(0, 5)); // Get the first 5 patients
        } else {
          throw new Error(
            'Unexpected response structure: "patients" field is missing'
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient: Patient) => {
    if (onSelectPatient) {
      onSelectPatient(patient);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg mb-4 mt-6 ml-6 shadow-md W-[367px] h-[1054px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Patients</h2>

        <div className="relative w-full max-w-xs ml-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg pl-10 pr-4 py-2 w-full border border-gray-300 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {/* Scrollable container with a fixed height */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <ul className="space-y-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <li
                key={patient.name}
                className="flex items-center justify-between cursor-pointer bg-white p-4 hover:bg-teal-100 rounded-lg shadow-sm border border-gray-200"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="flex items-center flex-grow">
                  <img
                    src={patient.profile_picture}
                    alt={`${patient.name}'s profile`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{patient.name}</h3>
                    <p className="text-gray-600">
                      {patient.gender}, {patient.age} years
                    </p>
                  </div>
                </div>
                <FaEllipsisH className="text-gray-600" />
              </li>
            ))
          ) : (
            <div>No patients found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Patients;
