import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ghibli-cream via-ghibli-tan/30 to-ghibli-sage/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-ghibli-dark-brown dark:text-white mb-6">
              Transform Your Ideas Into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ghibli-sage to-ghibli-brown mt-2">
                Magical 3D Printables
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Generate stunning AI-powered concept art in Studio Ghibli, Pixar, and more styles.
              Perfect for 3D printing enthusiasts and creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-ghibli-sage to-ghibli-brown text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                🎨 Try Free Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-ghibli-dark-brown dark:text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-ghibli-sage"
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ✨ 100% Free Mode
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              🚀 No API Key Required
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              🎯 5 Art Styles
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ⚡ Instant Generation
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ghibli-dark-brown dark:text-white mb-4">
              Why Creators Love Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
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
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-ghibli-dark-brown dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Styles Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ghibli-dark-brown dark:text-white mb-4">
              5 Stunning Art Styles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
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
                className="bg-gradient-to-br from-white to-ghibli-tan/20 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl mb-3">{style.emoji}</div>
                <h4 className="font-bold text-ghibli-dark-brown dark:text-white">
                  {style.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ghibli-dark-brown dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
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
                className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg ${
                  tier.popular ? 'ring-4 ring-ghibli-sage scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-ghibli-sage to-ghibli-brown text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-ghibli-dark-brown dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-ghibli-brown dark:text-ghibli-sage mb-2">
                    {tier.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{tier.period}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={tier.action}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-ghibli-sage to-ghibli-brown text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-ghibli-dark-brown dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ghibli-dark-brown dark:text-white mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of creators bringing their 3D printing ideas to life
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-ghibli-sage to-ghibli-brown text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all"
            >
              Start Creating Free 🚀
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ghibli-dark-brown dark:bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Ghibli Trinkets</h4>
              <p className="text-gray-400 text-sm">
                AI-powered 3D printable concept art generator
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://github.com" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
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
  );
};

const features = [
  {
    icon: '🆓',
    title: 'Free Forever',
    description: 'Unlimited text-to-image generation with Pollinations.ai. No credit card, no API key, no limits.'
  },
  {
    icon: '✨',
    title: 'Premium Power',
    description: 'Upgrade to TRUE image-to-image transformation with fal.ai FLUX.1. Free credits included!'
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
    name: 'Free',
    price: '$0',
    period: 'Forever',
    icon: '🆓',
    popular: false,
    cta: 'Start Free',
    action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    features: [
      'Unlimited text-to-image generation',
      'Reference mode (describe images)',
      '5 art styles',
      'Web app access',
      'No API key required',
      'Community support'
    ]
  },
  {
    name: 'Premium',
    price: 'Free Credits',
    period: 'Then pay-as-you-go',
    icon: '✨',
    popular: true,
    cta: 'Get Free Credits',
    action: () => window.open('https://fal.ai/', '_blank'),
    features: [
      'Everything in Free',
      'TRUE image-to-image transformation',
      'FLUX.1 AI model',
      'Higher quality results',
      'Direct image transformation',
      'Free credits included',
      'Priority support'
    ]
  },
  {
    name: 'Desktop',
    price: '$29',
    period: 'One-time purchase',
    icon: '💻',
    popular: false,
    cta: 'Coming Soon',
    action: () => alert('Desktop version coming soon! Join our waitlist.'),
    features: [
      'Everything in Premium',
      'Offline mode',
      'Self-executable file',
      'No internet required',
      'Lifetime updates',
      'Local AI processing',
      'Privacy-first'
    ]
  }
];

