import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtStyle } from '../types';

interface BatchGenerationProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (count: number, variations: boolean) => void;
  selectedStyle: ArtStyle;
}

export const BatchGeneration: React.FC<BatchGenerationProps> = ({
  isOpen,
  onClose,
  onGenerate,
  selectedStyle,
}) => {
  const [count, setCount] = useState(4);
  const [useVariations, setUseVariations] = useState(true);

  const handleGenerate = () => {
    onGenerate(count, useVariations);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-ghibli-dark-brown dark:text-gray-100 mb-4">
            Batch Generation
          </h2>

          <p className="text-ghibli-brown dark:text-gray-400 mb-6">
            Generate multiple images at once in <span className="font-semibold">{selectedStyle}</span> style.
          </p>

          <div className="space-y-6">
            {/* Count selector */}
            <div>
              <label className="block text-sm font-semibold text-ghibli-dark-brown dark:text-gray-300 mb-2">
                Number of images: {count}
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 bg-ghibli-tan/30 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-ghibli-dark-green"
              />
              <div className="flex justify-between text-xs text-ghibli-brown dark:text-gray-500 mt-1">
                <span>2</span>
                <span>10</span>
              </div>
            </div>

            {/* Variations toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-ghibli-dark-brown dark:text-gray-300">
                  Generate variations
                </label>
                <p className="text-xs text-ghibli-brown dark:text-gray-500 mt-1">
                  Create different interpretations of the same prompt
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUseVariations(!useVariations)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  useVariations ? 'bg-ghibli-dark-green' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    useVariations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Estimated time */}
            <div className="bg-ghibli-cream/50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-xs text-ghibli-brown dark:text-gray-400">
                ⏱️ Estimated time: <span className="font-semibold">{count * 10}-{count * 15} seconds</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex-1 px-4 py-2 bg-ghibli-dark-green text-white rounded-lg hover:bg-ghibli-dark-green/90 transition-colors font-semibold"
            >
              Generate {count} Images
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

