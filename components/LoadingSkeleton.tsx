import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-square bg-gradient-to-br from-ghibli-cream to-ghibli-tan/30 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden relative">
      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Pulsing circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-32 h-32 rounded-full bg-ghibli-green/20 dark:bg-green-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-ghibli-dark-green/20 dark:bg-green-600/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <motion.p
          className="text-ghibli-dark-brown dark:text-gray-300 font-semibold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Creating your masterpiece...
        </motion.p>
      </div>
    </div>
  );
};

