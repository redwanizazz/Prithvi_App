
import React from 'react';

export default function SeasonBadge({ season }) {
  let colors = "bg-gray-100 text-gray-800";
  let label = season;
  
  switch(season) {
    case 'pre-monsoon': colors = "bg-orange-100 text-orange-800 border-orange-200"; label = "Pre-Monsoon"; break;
    case 'monsoon': colors = "bg-blue-100 text-blue-800 border-blue-200"; label = "Monsoon"; break;
    case 'post-monsoon': colors = "bg-teal-100 text-teal-800 border-teal-200"; label = "Post-Monsoon"; break;
    case 'dry-winter': colors = "bg-indigo-100 text-indigo-800 border-indigo-200"; label = "Dry Winter"; break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${colors}`}>
      {label}
    </span>
  );
}
