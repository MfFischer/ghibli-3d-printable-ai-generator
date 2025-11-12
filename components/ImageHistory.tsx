import React from 'react';

interface ImageHistoryProps {
  history: string[];
  onImageSelect: (url: string) => void;
}

export const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onImageSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-ghibli-dark-brown mb-4 text-center">Recent Creations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {history.map((imageUrl, index) => (
          <div
            key={index}
            className="aspect-square bg-ghibli-cream border-2 border-ghibli-tan rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:border-ghibli-dark-green transition-all duration-200"
            onClick={() => onImageSelect(imageUrl)}
            role="button"
            aria-label={`View creation ${index + 1}`}
          >
            <img
              src={imageUrl}
              alt={`Generated creation ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
