import React from 'react';

interface StyleSelectorProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  isLoading: boolean;
}

const styles = [
  'Ghibli-esque',
  'Pixar 3D',
  'Claymation',
  'Modern Anime',
  'Action Figure',
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, setSelectedStyle, isLoading }) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor="style-selector" className="block text-lg font-semibold text-ghibli-dark-brown mb-2">
        Choose your style
      </label>
      <div className="relative">
        <select
          id="style-selector"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          disabled={isLoading}
          className="w-full appearance-none bg-ghibli-cream border-2 border-ghibli-tan rounded-lg py-2 px-4 pr-8 text-base text-ghibli-dark-brown focus:ring-2 focus:ring-ghibli-green focus:border-ghibli-green transition duration-200 cursor-pointer"
        >
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-ghibli-dark-brown">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
