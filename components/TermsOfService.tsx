import React from 'react';
import { motion } from 'framer-motion';

interface TermsOfServiceProps {
  onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
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
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              By accessing and using Ghibli Trinkets ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Ghibli Trinkets is an AI-powered concept art generator that creates images in various art styles for 3D printing reference. The Service offers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Free Mode:</strong> Unlimited text-to-image generation using Pollinations.ai</li>
              <li><strong>Premium Mode:</strong> Image-to-image transformation using fal.ai (requires API key)</li>
              <li><strong>Desktop Version:</strong> Downloadable application (coming soon)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              3. User Responsibilities
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              3.1 Acceptable Use
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You agree to use the Service only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Generate illegal, harmful, or offensive content</li>
              <li>Violate any intellectual property rights</li>
              <li>Attempt to reverse engineer or hack the Service</li>
              <li>Use the Service to spam or harass others</li>
              <li>Generate content that violates third-party rights</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              3.2 API Keys
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you use Premium Mode, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Obtaining and maintaining your own fal.ai API key</li>
              <li>Complying with fal.ai's terms of service</li>
              <li>Any costs associated with API usage</li>
              <li>Keeping your API key secure</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              4. Intellectual Property
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              4.1 Generated Content
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Images generated through the Service are subject to the terms of the underlying AI providers (Pollinations.ai and fal.ai). You should review their respective terms regarding ownership and usage rights.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              4.2 Service Content
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The Service itself, including its design, code, and branding, is owned by Ghibli Trinkets and protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-3">
              <li>Uninterrupted or error-free operation</li>
              <li>Accuracy or quality of generated images</li>
              <li>Availability of third-party AI services</li>
              <li>Suitability for any particular purpose</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, GHIBLI TRINKETS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              7. Pricing and Payments
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              7.1 Free Mode
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Free Mode is provided at no cost and may be modified or discontinued at any time.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              7.2 Premium Mode
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Premium Mode requires your own fal.ai API key. You are responsible for all costs associated with fal.ai usage.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              7.3 Desktop Version
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The Desktop Version will be available for a one-time purchase. Pricing and terms will be announced upon release.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              8. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We reserve the right to terminate or suspend access to the Service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-3">
              10. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              For questions about these Terms, contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:legal@ghibli-trinkets.app" className="text-ghibli-sage hover:underline">legal@ghibli-trinkets.app</a>
            </p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

