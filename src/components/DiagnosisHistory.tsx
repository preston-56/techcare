import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem
} from "chart.js";
import { DiagnosisHistoryProps } from "../interfaces";
import heart from "../assets/HeartBPM.svg";
import lungs from "../assets/respiratory rate.svg";
import temperature from "../assets/temperature.svg";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({ patient }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!patient) {
    return <div>No patient data available</div>;
  }

  const { diagnosis_history } = patient;

  if (diagnosis_history.length === 0) {
    return <div>No diagnosis history available</div>;
  }

  // Average heart rate, temperature, and respiratory rate ranges
  const averageHeartRate = { min: 80, max: 100 };
  const averageTemperature = 98.6;
  const averageRespiratoryRate = { min: 12, max: 30 };

  // Blood pressure thresholds for systolic and diastolic
  const systolicThresholds = { min: 90, max: 120 };
  const diastolicThresholds = { min: 60, max: 80 };

  // Prepare data for the chart
  const labels = diagnosis_history.map(
    (entry) => `${entry.month} ${entry.year}`
  );
  const systolic = diagnosis_history.map(
    (entry) => entry.blood_pressure.systolic.value
  );
  const diastolic = diagnosis_history.map(
    (entry) => entry.blood_pressure.diastolic.value
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Systolic Pressure",
        data: systolic,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: "Diastolic Pressure",
        data: diastolic,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  // Chart options with click event handler
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const
      },
      tooltip: {
        callbacks: {
          afterBody: (context: TooltipItem<"line">[]) => {
            const index = context[0]?.dataIndex;
            if (index !== undefined && index !== null) {
              setSelectedIndex(index);
            }
            return [];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month-Year"
        }
      },
      y: {
        title: {
          display: true,
          text: "Blood Pressure (mmHg)"
        }
      }
    }
  };

  // Helper function to get the appropriate icon and text based on the value
  const getLevelIndicator = (
    value: number,
    average: { min: number; max: number } | number
  ) => {
    if (typeof average === "object") {
      if (value > average.max) {
        return {
          icon: <FaArrowUp className="text-red-500" />,
          text: "Higher than average"
        };
      } else if (value < average.min) {
        return {
          icon: <FaArrowDown className="text-blue-500" />,
          text: "Lower than average"
        };
      } else {
        return { icon: null, text: "Normal" };
      }
    } else {
      if (value > average) {
        return {
          icon: <FaArrowUp className="text-red-500" />,
          text: "Higher than average"
        };
      } else if (value < average) {
        return {
          icon: <FaArrowDown className="text-blue-500" />,
          text: "Lower than average"
        };
      } else {
        return { icon: null, text: "Normal" };
      }
    }
  };

  const getBloodPressureIndicator = (
    value: number,
    thresholds: { min: number; max: number }
  ) => {
    if (value > thresholds.max) {
      return {
        icon: <FaArrowUp className="text-red-500" />,
        text: "Higher than average"
      };
    } else if (value < thresholds.min) {
      return {
        icon: <FaArrowDown className="text-blue-500" />,
        text: "Lower than average"
      };
    } else {
      return { icon: null, text: "Normal" };
    }
  };

  const selectedDiagnosis =
    selectedIndex !== null
      ? diagnosis_history[selectedIndex]
      : diagnosis_history[0];

  const respiratoryRateIndicator = getLevelIndicator(
    selectedDiagnosis.respiratory_rate.value,
    averageRespiratoryRate
  );
  const temperatureIndicator = getLevelIndicator(
    selectedDiagnosis.temperature.value,
    averageTemperature
  );
  const heartRateIndicator = getLevelIndicator(
    selectedDiagnosis.heart_rate.value,
    averageHeartRate
  );

  const systolicIndicator = getBloodPressureIndicator(
    selectedDiagnosis.blood_pressure.systolic.value,
    systolicThresholds
  );
  const diastolicIndicator = getBloodPressureIndicator(
    selectedDiagnosis.blood_pressure.diastolic.value,
    diastolicThresholds
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-md ml-4 mt-2 w-[766px] h-[673px] flex">
      <div className="flex flex-col flex-1">
        <h2 className="font-bold text-lg mb-4 ml-4">
          Diagnosis History for {patient.name}
        </h2>
        <div className="bg-purple-100 rounded-lg p-4 flex">
          <div className="flex-1 h-64">
            <Line data={chartData} options={options} />
          </div>
          <div className="flex flex-col ml-4">
            <div className="mb-4">
              <h3 className="font-bold text-lg">Systolic Pressure</h3>
              <p className="text-lg">
                {selectedDiagnosis.blood_pressure.systolic.value} mmHg
              </p>
              <div className="flex items-center">
                {systolicIndicator.icon}
                <p className="text-sm text-gray-500 ml-2">
                  {systolicIndicator.text}
                </p>
              </div>
              <hr className="my-2 border-gray-300" />
              <h3 className="font-bold text-lg mt-4">Diastolic Pressure</h3>
              <p className="text-lg">
                {selectedDiagnosis.blood_pressure.diastolic.value} mmHg
              </p>
              <div className="flex items-center">
                {diastolicIndicator.icon}
                <p className="text-sm text-gray-500 ml-2">
                  {diastolicIndicator.text}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 mb-2">
          <div className="bg-cyan-100 shadow-md p-4 rounded-lg flex flex-col items-center">
            <img src={lungs} alt="lungs" className="w-16 h-16 mb-2" />
            <div className="flex items-center">
              {respiratoryRateIndicator.icon}
              <div className="ml-2">
                <h3 className="font-bold">Respiratory Rate</h3>
                <p className="text-lg">
                  {selectedDiagnosis.respiratory_rate.value} BPM
                </p>
                <p className="text-sm text-gray-500">
                  {respiratoryRateIndicator.text}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-pink-100 shadow-md p-4 rounded-lg flex flex-col items-center">
            <img
              src={temperature}
              alt="temperature"
              className="w-16 h-16 mb-2"
            />
            <div className="flex items-center">
              {temperatureIndicator.icon}
              <div className="ml-2">
                <h3 className="font-bold">Temperature</h3>
                <p className="text-lg">
                  {selectedDiagnosis.temperature.value} °F
                </p>
                <p className="text-sm text-gray-500">
                  {temperatureIndicator.text}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-pink-200 shadow-md p-4 rounded-lg flex flex-col items-center">
            <img src={heart} alt="heart rate" className="w-16 h-16 mb-2" />
            <div className="flex items-center">
              {heartRateIndicator.icon}
              <div className="ml-2">
                <h3 className="font-bold">Heart Rate</h3>
                <p className="text-lg">
                  {selectedDiagnosis.heart_rate.value} BPM
                </p>
                <p className="text-sm text-gray-500">
                  {heartRateIndicator.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
