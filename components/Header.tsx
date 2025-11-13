import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenSettings?: () => void;
  onBackToHome?: () => void;
}

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onBackToHome }) => {
  return (
    <header className="w-full">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-ghibli-tan/20 dark:border-gray-700">
        {/* Left side - Back to Home button */}
        <div className="flex-shrink-0">
          {onBackToHome ? (
            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 bg-ghibli-tan/30 dark:bg-gray-700 text-ghibli-dark-brown dark:text-white hover:bg-ghibli-tan/50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Back to home"
              title="Back to Home"
            >
              <HomeIcon />
              <span className="text-sm font-semibold">Home</span>
            </button>
          ) : (
            <div className="w-24"></div>
          )}
        </div>

        {/* Center - Title (hidden on mobile, shown on larger screens) */}
        <div className="hidden md:block text-center flex-grow">
          <h2 className="text-xl font-bold text-ghibli-dark-brown dark:text-gray-100">
            Ghibli-esque Trinkets
          </h2>
        </div>

        {/* Right side - Theme toggle and Settings */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 bg-ghibli-tan/30 dark:bg-gray-700 text-ghibli-dark-brown dark:text-white hover:bg-ghibli-tan/50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Open settings"
              title="Settings"
            >
              <SettingsIcon />
            </button>
          )}
        </div>
      </div>

      {/* Main title section */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <LeafIcon className="w-8 h-8 text-ghibli-dark-green dark:text-green-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-ghibli-dark-brown dark:text-gray-100">
            Ghibli-esque Trinkets
          </h1>
          <LeafIcon className="w-8 h-8 text-ghibli-dark-green dark:text-green-400 transform -scale-x-100" />
        </div>
        <p className="mt-2 text-md sm:text-lg text-ghibli-brown dark:text-gray-400">
          Generate ideas for charming 3D-printable creations.
        </p>
      </div>
    </header>
  );
};
