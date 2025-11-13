import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}
        {showTermsOfService && <TermsOfService onClose={() => setShowTermsOfService(false)} />}
      </AnimatePresence>
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Ideas Into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600 mt-2">
                Magical 3D Printables
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-8 max-w-3xl mx-auto font-medium">
              Generate stunning AI-powered concept art in Studio Ghibli, Pixar, and more styles.
              Perfect for 3D printing enthusiasts and creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                🎨 Try Free Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-emerald-600 dark:border-emerald-500"
              >
                View Pricing
              </motion.a>
            </div>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <div className="bg-white dark:bg-gray-800 backdrop-blur-sm px-5 py-3 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-md border border-gray-200 dark:border-gray-700">
              ✨ 100% Free Mode
            </div>
            <div className="bg-white dark:bg-gray-800 backdrop-blur-sm px-5 py-3 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-md border border-gray-200 dark:border-gray-700">
              🚀 No API Key Required
            </div>
            <div className="bg-white dark:bg-gray-800 backdrop-blur-sm px-5 py-3 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-md border border-gray-200 dark:border-gray-700">
              🎯 5 Art Styles
            </div>
            <div className="bg-white dark:bg-gray-800 backdrop-blur-sm px-5 py-3 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-md border border-gray-200 dark:border-gray-700">
              ⚡ Instant Generation
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Creators Love Us
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              Everything you need to bring your 3D printing ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Styles Showcase */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              5 Stunning Art Styles
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              From whimsical Ghibli to action-packed figures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {artStyles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">{style.emoji}</div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {style.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              Start free, upgrade when you need more power
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl border-2 ${
                  tier.popular ? 'border-emerald-500 scale-105' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {tier.price}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{tier.period}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2 font-bold">✓</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={tier.action}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-xl'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg'
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 font-medium">
              Join thousands of creators bringing their 3D printing ideas to life
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all"
            >
              Start Creating Free 🚀
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Ghibli Trinkets</h4>
              <p className="text-gray-300 text-sm font-medium">
                AI-powered 3D printable concept art generator
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white font-medium">Get Started</button></li>
                <li><a href="#pricing" className="hover:text-white font-medium">Pricing</a></li>
                <li><a href="https://github.com/MfFischer/ghibli-3d-printable-ai-generator#readme" target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button type="button" onClick={() => setShowPrivacyPolicy(true)} className="hover:text-white">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setShowTermsOfService(true)} className="hover:text-white">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setShowPrivacyPolicy(true)} className="hover:text-white">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://github.com/MfFischer/ghibli-3d-printable-ai-generator" target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium">GitHub</a></li>
                <li><a href="mailto:contact@ghibli-trinkets.app" className="hover:text-white font-medium">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Ghibli Trinkets. All rights reserved.</p>
            <p className="mt-2">
              Powered by <a href="https://pollinations.ai/" className="text-ghibli-sage hover:underline">Pollinations.ai</a> & <a href="https://fal.ai/" className="text-ghibli-sage hover:underline">fal.ai</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

const features = [
  {
    icon: '🆓',
    title: 'Free Forever',
    description: 'Unlimited text-to-image generation with Pollinations.ai. No credit card, no API key, no limits.'
  },
  {
    icon: '🔑',
    title: 'Optional Gemini API',
    description: 'Add your free Google Gemini API key for alternative AI generation. Still 100% free!'
  },
  {
    icon: '🎨',
    title: '5 Art Styles',
    description: 'Ghibli-esque, Pixar 3D, Claymation, Modern Anime, and Action Figure styles at your fingertips.'
  }
];

const artStyles = [
  { name: 'Ghibli-esque', emoji: '🌿' },
  { name: 'Pixar 3D', emoji: '🎬' },
  { name: 'Claymation', emoji: '🧱' },
  { name: 'Modern Anime', emoji: '⚡' },
  { name: 'Action Figure', emoji: '🦸' }
];

const pricingTiers = [
  {
    name: 'Web App',
    price: '$0',
    period: 'Forever Free',
    icon: '🌐',
    popular: true,
    cta: 'Start Creating',
    action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    features: [
      'Unlimited text-to-image generation',
      '5 stunning art styles',
      'Powered by Pollinations.ai',
      'Optional Gemini API support',
      'No credit card required',
      'No API key required (default)',
      'Download high-res images',
      'Generation history'
    ]
  },
  {
    name: 'Desktop',
    price: '$29',
    period: 'One-time purchase',
    icon: '💻',
    popular: false,
    cta: 'Coming Soon',
    action: () => alert('Desktop version coming soon! Join our waitlist at contact@ghibli-trinkets.app'),
    features: [
      'Everything in Web App',
      'Offline mode (no internet needed)',
      'Self-executable application',
      'Windows, Mac, Linux support',
      'Faster local generation',
      'Lifetime updates',
      'Privacy-first (data stays local)',
      'One-time payment, no subscription'
    ]
  }
];

