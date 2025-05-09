import React from "react";

const ProfileProgress = ({ progress  }) => {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#16A34A"
            strokeWidth="8"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 - (282.6 * progress) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
      <div className="absolute w-36 h-36 flex items-center justify-center rounded-full overflow-hidden bg-white">
        <img
          src="/assets/DUCKTAIL-HOMELOAN.avif" 
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 bg-white px-3 py-1 rounded-lg shadow-md text-green-600 font-semibold text-sm">
        {progress} %
      </div>
    </div>
  );
};

export default ProfileProgress;
