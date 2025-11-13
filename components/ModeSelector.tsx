import React, { useState } from 'react';
import { GenerationMode } from '../services/geminiService';

interface ModeSelectorProps {
  mode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
  falApiKey: string;
  onFalApiKeyChange: (key: string) => void;
  hasBaseImage: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onModeChange,
  falApiKey,
  onFalApiKeyChange,
  hasBaseImage
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(falApiKey);

  const handleSaveApiKey = () => {
    onFalApiKeyChange(tempApiKey);
    setShowApiKeyInput(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-ghibli-dark-brown dark:text-gray-200">
          Generation Mode
        </h3>
        {mode === 'premium' && !falApiKey && (
          <button
            type="button"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-xs text-blue-600 hover:text-blue-700 underline"
          >
            {showApiKeyInput ? 'Cancel' : 'Add API Key'}
          </button>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <button
          type="button"
          onClick={() => onModeChange('free')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            mode === 'free'
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl">🆓</span>
          </div>
          <div className="text-sm font-semibold text-ghibli-dark-brown dark:text-gray-200">
            Free Mode
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Unlimited • No API key
          </div>
        </button>

        <button
          type="button"
          onClick={() => onModeChange('premium')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            mode === 'premium'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl">✨</span>
          </div>
          <div className="text-sm font-semibold text-ghibli-dark-brown dark:text-gray-200">
            Premium Mode
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            TRUE img2img • Free credits
          </div>
        </button>
      </div>

      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            fal.ai API Key
          </label>
          <input
            type="password"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="Enter your fal.ai API key"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Save Key
            </button>
            <a
              href="https://fal.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 text-center"
            >
              Get Free Key
            </a>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Get free credits at <a href="https://fal.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">fal.ai</a>
          </p>
        </div>
      )}

      {/* Mode Description */}
      <div className="bg-ghibli-tan/20 dark:bg-gray-700/50 p-3 rounded-lg text-xs">
        {mode === 'free' ? (
          <div>
            <p className="font-semibold text-ghibli-dark-brown dark:text-gray-200 mb-1">
              🎨 Free Mode Active
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {hasBaseImage
                ? 'Describe your uploaded image and AI will recreate it in your chosen style.'
                : 'Generate images from text descriptions. Upload an image to use it as a reference.'}
            </p>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
              ✨ Premium Mode Active
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {hasBaseImage
                ? 'TRUE image-to-image transformation! Your uploaded image will be directly transformed.'
                : 'Upload an image to use premium image-to-image transformation with FLUX.1 model.'}
            </p>
            {!falApiKey && (
              <p className="text-red-600 dark:text-red-400 mt-2 font-medium">
                ⚠️ API key required for premium mode
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

