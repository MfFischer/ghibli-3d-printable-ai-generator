import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageComparisonProps {
  images: Array<{ url: string; label?: string }>;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({ images, isOpen, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Compare Images ({images.length})
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl font-bold"
              aria-label="Close comparison"
            >
              ×
            </button>
          </div>

          {/* Main comparison area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {images.slice(0, 2).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.label || `Image ${index + 1}`}
                  className="w-full h-auto"
                />
                {image.label && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-center">
                    {image.label}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Thumbnail grid for more images */}
          {images.length > 2 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-ghibli-dark-green'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.label || `Thumbnail ${index + 1}`}
                    className="w-full h-auto"
                  />
                </motion.button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedIndex === 0}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              ← Previous
            </button>
            <span className="px-4 py-2 text-white">
              {selectedIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => Math.min(images.length - 1, prev + 1))}
              disabled={selectedIndex === images.length - 1}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

