import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenSettings?: () => void;
}

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="text-center relative">
      <div className="absolute right-0 top-0 flex gap-2">
        <ThemeToggle />
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 text-ghibli-brown dark:text-gray-300 hover:text-ghibli-dark-brown dark:hover:text-white hover:bg-ghibli-tan/30 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            aria-label="Open settings"
            title="Settings"
          >
            <SettingsIcon />
          </button>
        )}
      </div>
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
    </header>
  );
};
