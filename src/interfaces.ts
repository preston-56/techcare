export interface BloodPressure {
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  }
  
  export interface BloodPressureData {
    labels: string[]; 
    systolic: number[]; 
    diastolic: number[]; 
  }
  
  export interface HeartRate {
    value: number;
    levels: string;
  }
  
  export interface RespiratoryRate {
    value: number;
    levels: string;
  }
  
  export interface Temperature {
    value: number;
    levels: string;
  }
  
  export interface DiagnosisEntry {
    month: string; 
    year: number; 
    blood_pressure: BloodPressure;  
    heart_rate: HeartRate; 
    respiratory_rate: RespiratoryRate; 
    temperature: Temperature; 
  }
  
  export interface DiagnosticItem {
    name: string; 
    description: string;
    status: string; 
  }
  
  export interface Patient {
    id: string;
    name: string; 
    gender: string; 
    age: number; 
    profile_picture: string; 
    date_of_birth: string; 
    phone_number: string; 
    emergency_contact: string;
    insurance_type: string; 
    diagnosis_history: Diagnosis[]; 
    diagnostic_list: DiagnosticItem[]; 
    lab_results: LabResult[]; 
  }
  
  export interface DiagnosisHistory {
    month: string;
    year: number;
    blood_pressure: BloodPressure;
  }
  
  export interface PatientData {
    name: string;
    gender: string;
    age: number;
    diagnosis_history: DiagnosisHistory[];
  }
  
  export interface DiagnosisHistoryProps {
    patient: Patient | null;
  }
  
  export interface ApiResponse {
    month: string; 
    year: number; 
    blood_pressure: BloodPressure; 
    heart_rate: {
      value: number;
      levels: string;
    };
    respiratory_rate: {
      value: number;
      levels: string;
    };
    temperature: {
      value: number;
      levels: string;
    };
  }
  
  export interface PatientProfileProps {
    patient: Patient | null;
  }
  
  export interface PatientsProps {
    patients: Patient[];
    onSelectPatient: (patient: Patient | null) => void;
  }
  
  export interface Diagnosis {
    name: string;
    month: string;
    year: number;
    blood_pressure: {
      systolic: {
        value: number;
        levels: string;
      };
      diastolic: {
        value: number;
        levels: string;
      };
    };
    heart_rate: {
      value: number;
      levels: string;
    };
    respiratory_rate: {
      value: number;
      levels: string;
    };
    temperature: {
      value: number;
      levels: string;
    };
  }
  
  
  export interface DiagnosisListProps {
    diagnosticList: DiagnosticItem[];
  }
  
  
  export interface LabResult {
    testName: string; 
    result: string; 
  }
  
  export interface LabResultsProps {
    labResults: LabResult[]; 
  }
  