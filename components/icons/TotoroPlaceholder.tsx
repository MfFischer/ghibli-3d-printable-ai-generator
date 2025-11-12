
import React from 'react';

export const TotoroPlaceholder = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M85,45 C85,67.09139 67.09139,85 45,85 C22.90861,85 5,67.09139 5,45 C5,22.90861 22.90861,5 45,5 C67.09139,5 85,22.90861 85,45 Z" fill="#D2B48C" opacity="0.5" />
    <path d="M75,55 C75,71.568542 61.568542,85 45,85 C28.431458,85 15,71.568542 15,55 C15,38.431458 28.431458,25 45,25 C61.568542,25 75,38.431458 75,55 Z" />
    <circle cx="35" cy="45" r="4" fill="#FDF6E3" />
    <circle cx="55" cy="45" r="4" fill="#FDF6E3" />
    <path d="M45,55 C48.313708,55 51,52.313708 51,49 C51,45.686292 48.313708,43 45,43 C41.686292,43 39,45.686292 39,49 C39,52.313708 41.686292,55 45,55 Z" />
    <path d="M30,30 L25,20" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" />
    <path d="M60,30 L65,20" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
