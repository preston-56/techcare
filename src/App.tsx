import React, { useState, useEffect } from 'react';
import './index.css';
import TopBar from './components/Topbar';
import Patients from './components/Patients';
import DiagnosisHistory from './components/DiagnosisHistory';
import PatientProfile from './components/PatientProfile';
import DiagnosisList from './components/DiagnosisList';
import LabResults from './components/LabResults';
import { Patient, Diagnosis } from './interfaces';

const App: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [labResults, setLabResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + btoa('coalition:skills-test'),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPatients(data.patients || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      // Fetch diagnosis list and lab results based on the selected patient
      const fetchDiagnosisList = async () => {
        try {
          const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + btoa('coalition:skills-test'),
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setDiagnosisList(data.diagnostic_list || []);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };

      const fetchLabResults = async () => {
        try {
          const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + btoa('coalition:skills-test'),
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setLabResults(data.lab_results || []);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };

      fetchDiagnosisList();
      fetchLabResults();
    }
  }, [selectedPatient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      {error && <div className="bg-red-500 text-white p-4 text-center">{error}</div>}
      <div className="flex">
        <Patients patients={patients} onSelectPatient={setSelectedPatient} />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPatient && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <DiagnosisHistory patient={selectedPatient} />
                </div>
                <div className="flex-1">
                  <PatientProfile patient={selectedPatient} />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              {selectedPatient && <DiagnosisList diagnosticList={selectedPatient.diagnostic_list} />}
            </div>
            <div className="flex-1">
              {selectedPatient && <LabResults labResults={selectedPatient.lab_results} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
