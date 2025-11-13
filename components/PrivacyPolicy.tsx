import React from 'react';
import { motion } from 'framer-motion';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-ghibli-dark-brown dark:text-white">
            Privacy Policy
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Last updated: January 13, 2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Welcome to Ghibli Trinkets ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our AI-powered 3D printable concept art generator.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Text prompts you enter for image generation</li>
              <li>Images you upload (stored locally only)</li>
              <li>API keys (stored locally in your browser)</li>
              <li>Generation history (stored locally in your browser)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              2.2 Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage statistics (via cookies)</li>
              <li>Theme preferences (light/dark mode)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>To generate AI images based on your prompts</li>
              <li>To improve our service and user experience</li>
              <li>To provide customer support</li>
              <li>To maintain generation history (locally)</li>
              <li>To remember your preferences</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              4. Data Storage and Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Local Storage:</strong> Your API keys, generation history, and uploaded images are stored locally in your browser using localStorage and IndexedDB. We do not store this data on our servers.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Third-Party Services:</strong> We use the following third-party AI services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Pollinations.ai</strong> (Free Mode): Your prompts are sent to their API for image generation</li>
              <li><strong>fal.ai</strong> (Premium Mode): Your images and prompts are sent to their API for transformation</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Please review their respective privacy policies for more information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              5. Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Remember your theme preference (light/dark mode)</li>
              <li>Store your cookie consent choice</li>
              <li>Maintain your session</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You can disable cookies in your browser settings, but this may affect functionality.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              6. Your Rights (GDPR)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you are in the European Economic Area (EEA), you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Right to Access:</strong> Request a copy of your data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Delete your data (clear browser storage)</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Export your data</li>
              <li><strong>Right to Object:</strong> Object to data processing</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              7. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:privacy@ghibli-trinkets.app" className="text-ghibli-sage hover:underline">privacy@ghibli-trinkets.app</a>
            </p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

