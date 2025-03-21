import React from "react";
import { Patient } from "../interfaces";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Calendar, Users, Phone, Shield } from "lucide-react";

const PatientProfile: React.FC<{ patient: Patient }> = ({ patient }) => {
  if (!patient) return <p className="text-gray-600 text-center">Select a patient to see their profile.</p>;

  return (
    <div 
      id="profile"
      className="mt-2 mx-auto w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto shadow-md p-6 bg-white rounded-lg"
    >
      <div className="flex flex-col items-center space-y-4 pb-2">
        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
          <AvatarImage src={patient.profile_picture} alt={patient.name} />
          <AvatarFallback>{patient.name?.charAt(0) || "P"}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl sm:text-2xl font-semibold text-center">{patient.name || "N/A"}</h3>
      </div>

      <div className="space-y-5 w-2xs">
        {/** Patient Details */}
        <InfoBlock icon={Calendar} label="Date of Birth" value={patient.date_of_birth} />
        <InfoBlock icon={Users} label="Gender" value={patient.gender} />
        <InfoBlock icon={Phone} label="Contact Info" value={patient.phone_number} />
        <InfoBlock icon={Phone} label="Emergency Contact" value={patient.emergency_contact} />
        <InfoBlock icon={Shield} label="Insurance Provider" value={patient.insurance_type} />
      </div>

      <div className="flex justify-center pt-5 pb-7">
        <Button variant="outline" className="bg-teal-300 hover:bg-teal-400 text-black rounded-sm px-6 py-2">
          Show All Information
        </Button>
      </div>
    </div>
  );
};

/** Reusable InfoBlock Component */
const InfoBlock = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) => (
  <div className="flex items-center gap-4 px-4">
    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
    </div>
    <div>
      <h4 className="font-semibold text-base sm:text-lg">{label}</h4>
      <span className="text-sm sm:text-base text-gray-600">{value || "N/A"}</span>
    </div>
  </div>
);

export default PatientProfile;
