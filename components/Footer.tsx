import React, { useState, lazy, Suspense } from 'react';

// Lazy load legal modals
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./TermsOfService').then(m => ({ default: m.TermsOfService })));

export const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="w-full text-center p-4 mt-8 border-t border-ghibli-tan/20 dark:border-gray-700">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="text-sm text-ghibli-brown dark:text-gray-400 hover:text-ghibli-dark-brown dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <span className="text-ghibli-tan dark:text-gray-600">•</span>
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-sm text-ghibli-brown dark:text-gray-400 hover:text-ghibli-dark-brown dark:hover:text-white transition-colors"
          >
            Terms of Service
          </button>
          <span className="text-ghibli-tan dark:text-gray-600">•</span>
          <a
            href="https://github.com/MfFischer/ghibli-3d-printable-ai-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ghibli-brown dark:text-gray-400 hover:text-ghibli-dark-brown dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm text-ghibli-tan dark:text-gray-500">
          Crafted with inspiration from magical forests.
        </p>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">Loading...</div>
        </div>}>
          <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
        </Suspense>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">Loading...</div>
        </Suspense>}>
          <TermsOfService onClose={() => setShowTerms(false)} />
        </Suspense>
      )}
    </>
  );
};
