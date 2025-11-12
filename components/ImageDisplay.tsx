import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TotoroPlaceholder } from './icons/TotoroPlaceholder';
import { LoadingSkeleton } from './LoadingSkeleton';
import { downloadOpenSCADFile } from '../utils/openscadGenerator';

interface BaseImage {
  data: string;
  mimeType: string;
}

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  baseImage: BaseImage | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const RemoveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, baseImage, onImageSelect, onImageRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
    if (event.target) {
        event.target.value = '';
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    
    if (error) {
       return (
        <div className="text-center text-red-600">
          <p className="font-bold">Oh no, something went wrong!</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }
    
    if (imageUrl) {
      const handleOpenSCADDownload = () => {
        const timestamp = new Date().getTime();
        downloadOpenSCADFile(`creation_${timestamp}`, {
          baseWidth: 50,
          baseDepth: 50,
          baseHeight: 2,
          includeStand: true,
        });
      };

      return (
        <div className="relative w-full h-full group">
            <img src={imageUrl} alt="Generated 3D model idea" className="w-full h-full object-contain rounded-md" />
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={imageUrl}
                download="ghibli-creation.png"
                className="bg-ghibli-dark-green text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghibli-dark-green transition-all duration-300 ease-in-out flex items-center justify-center"
                aria-label="Download PNG image"
              >
                <DownloadIcon />
                Download PNG
              </a>
              <button
                type="button"
                onClick={handleOpenSCADDownload}
                className="bg-ghibli-brown text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghibli-brown transition-all duration-300 ease-in-out flex items-center justify-center"
                aria-label="Download OpenSCAD template"
              >
                <CubeIcon />
                OpenSCAD Template
              </button>
            </div>
        </div>
      );
    }
    
    if (baseImage) {
        return (
            <div className="relative w-full h-full group">
                <img src={`data:${baseImage.mimeType};base64,${baseImage.data}`} alt="Uploaded base" className="w-full h-full object-contain rounded-md" />
                <button
                    type="button"
                    onClick={onImageRemove}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label="Remove image"
                >
                    <RemoveIcon />
                </button>
            </div>
        );
    }
    
    // Initial State
    return (
       <div className="text-center text-ghibli-brown flex flex-col items-center justify-center px-4">
        <TotoroPlaceholder className="w-24 h-24 mx-auto text-ghibli-tan" />
        <p className="mt-4 text-lg font-semibold">Your canvas is ready!</p>
        <p className="text-sm mb-2">Describe an idea to generate from scratch</p>
        <p className="text-xs text-ghibli-brown/70 mb-4">
          💡 Tip: Upload a reference image and describe what's in it to recreate it in your chosen style
        </p>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            aria-label="Upload image file"
        />
        <button
            type="button"
            onClick={handleUploadClick}
            className="bg-ghibli-tan text-ghibli-dark-brown font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghibli-tan transition-all duration-200 flex items-center justify-center"
        >
           <UploadIcon />
           Upload Reference Image
        </button>
      </div>
    );
  };

  return (
    <div className="w-full mt-6 bg-ghibli-cream border-2 border-dashed border-ghibli-tan rounded-lg p-4 flex items-center justify-center aspect-square transition-all duration-300 min-h-[300px] sm:min-h-[400px]">
      {renderContent()}
    </div>
  );
};