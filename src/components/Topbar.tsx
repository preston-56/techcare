import React from "react";
import logo from "../assets/TestLogo.svg";
import overview from "../assets/home_FILL0_wght300_GRAD0_opsz24.svg";
import patients from "../assets/group_FILL0_wght300_GRAD0_opsz24.svg";
import schedule from "../assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import credit from "../assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import messages from "../assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import senior from "../assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";
import settings from "../assets/settings_FILL0_wght300_GRAD0_opsz24.svg";
import ellipsis from "../assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg";

const TopBar: React.FC = () => {
  return (
    <header className="topbar bg-white rounded-lg shadow-md p-4 flex items-center justify-between mt-6">
      {/* Logo */}
      <div className="flex-none">
        <img src={logo} alt="Medical Dashboard Logo" className="w-52 h-auto" />
      </div>

      {/* Navigation Menu */}
      <nav aria-label="Main Navigation" className="flex-grow flex justify-center">
        <ul className="flex space-x-8">
          {[
            { name: "Overview", icon: overview, href: "#overview" },
            { name: "Patients", icon: patients, href: "#patients" },
            { name: "Schedule", icon: schedule, href: "#schedule" },
            { name: "Messages", icon: messages, href: "#messages" },
            { name: "Transactions", icon: credit, href: "#transactions" }
          ].map((item) => (
            <li key={item.name} className="flex items-center px-4 py-2 hover:bg-teal-300 rounded-full">
              <img src={item.icon} alt={`${item.name} Icon`} className="w-6 h-6 mr-2" />
              <a href={item.href} className="text-black font-bold hover:underline">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2" aria-label="User Profile">
          <img src={senior} alt="Dr. Jose Simmons" className="w-8 h-8 rounded-full" />
          <div className="text-black">
            <div className="font-bold">Dr. Jose Simmons</div>
            <div className="text-gray-500 text-sm">General Practitioner</div>
          </div>
        </div>
        <button aria-label="Settings">
          <img src={settings} alt="Settings Icon" className="w-6 h-6" />
        </button>
        <button aria-label="More Options">
          <img src={ellipsis} alt="More Options Icon" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
