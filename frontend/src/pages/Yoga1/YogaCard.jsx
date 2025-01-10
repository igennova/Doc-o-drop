import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-2 bg-blue-950/50 rounded-lg">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
