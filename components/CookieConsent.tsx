import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 shadow-2xl border-t-2 border-ghibli-sage"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                <a href="#" className="text-ghibli-sage hover:underline font-medium">
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-ghibli-sage to-ghibli-brown text-white rounded-lg hover:shadow-lg transition-all"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

