import React from 'react';

function StatsCard({ value, label }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
      <div className="text-xl font-bold text-blue-400">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

export default StatsCard;
