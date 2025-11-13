import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { useToast } from './hooks/useToast';
import { generateImage, GenerationMode } from './services/geminiService';
import { StyleSelector } from './components/StyleSelector';
import { ImageHistory } from './components/ImageHistory';
import { ModeSelector } from './components/ModeSelector';
import { LandingPage } from './components/LandingPage';
import { CookieConsent } from './components/CookieConsent';

// Lazy load heavy components
const Settings = lazy(() => import('./components/Settings').then(m => ({ default: m.Settings })));
const BatchGeneration = lazy(() => import('./components/BatchGeneration').then(m => ({ default: m.BatchGeneration })));
const ImageComparison = lazy(() => import('./components/ImageComparison').then(m => ({ default: m.ImageComparison })));

interface BaseImage {
  data: string;
  mimeType: string;
}

// Style-specific sample prompts for inspiration
const inspirationStarters: Record<string, string[]> = {
  'Ghibli-esque': [
    "A sleepy bear cub holding a star",
    "A tiny mouse postman with a big letter",
    "A mushroom-shaped house with a glowing window",
    "A cheerful radish spirit with a leaf hat",
    "A forest spirit reading a book under a tree",
    "A chubby cat bus keychain with tiny wheels",
  ],
  'Pixar 3D': [
    "A robot holding a potted plant",
    "A superhero dog with a flowing cape",
    "A magical lamp with swirling smoke",
    "A friendly monster with one big eye",
    "A racing car with expressive headlights",
    "A space explorer with a jetpack",
  ],
  'Claymation': [
    "A penguin wearing a tiny scarf",
    "A garden gnome with a fishing rod",
    "A sheep with fluffy wool texture",
    "A baker holding a tray of cookies",
    "A vintage telephone with googly eyes",
    "A cozy armchair with a reading lamp",
  ],
  'Modern Anime': [
    "A magical girl with flowing ribbons",
    "A cyber ninja with glowing katana",
    "A mecha pilot in dynamic pose",
    "A phoenix rising from flames",
    "A warrior with elemental powers",
    "A mystical fox with multiple tails",
  ],
  'Action Figure': [
    "A space marine with plasma rifle",
    "A medieval knight with sword and shield",
    "A cyberpunk hacker with neon accessories",
    "A samurai warrior in battle stance",
    "A superhero in heroic landing pose",
    "A post-apocalyptic survivor with gear",
  ],
};

const AppContent: React.FC = () => {
  const { toasts, removeToast, success, error: showError } = useToast();
  const [prompt, setPrompt] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [baseImage, setBaseImage] = useState<BaseImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('Ghibli-esque');
  const [history, setHistory] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('free');
  const [falApiKey, setFalApiKey] = useState<string>('');
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);

  // Load API keys and mode on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (window.electronAPI) {
        // Desktop app: load from Electron secure storage
        const key = await window.electronAPI.getApiKey();
        setApiKey(key);
      } else {
        // Web app: load from localStorage (less secure, for development)
        const key = localStorage.getItem('gemini_api_key') || '';
        setApiKey(key);
      }

      // Load fal.ai API key
      const falKey = import.meta.env.VITE_FAL_API_KEY || localStorage.getItem('fal_api_key') || '';
      setFalApiKey(falKey);

      // Load generation mode preference
      const savedMode = localStorage.getItem('generation_mode') as GenerationMode || 'free';
      setGenerationMode(savedMode);
    };
    loadSettings();
  }, []);

  // Listen for settings open event from Electron menu
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onOpenSettings(() => {
        setIsSettingsOpen(true);
      });
    }
  }, []);

  const handleSaveApiKey = async (newApiKey: string) => {
    if (window.electronAPI) {
      // Desktop app: save to Electron secure storage
      await window.electronAPI.setApiKey(newApiKey);
    } else {
      // Web app: save to localStorage
      localStorage.setItem('gemini_api_key', newApiKey);
    }
    setApiKey(newApiKey);
  };
  
  const handleImageSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setError(null);
    setCurrentImageUrl(null); // Clear previous result
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = (reader.result as string).split(',')[1];
        setBaseImage({
          data: base64String,
          mimeType: file.type,
        });
      } else {
         setError("Could not read the selected file.");
      }
    };
    reader.onerror = () => {
        setError("Failed to read the selected image.");
    };
    reader.readAsDataURL(file);
  }, []);
  
  const handleImageRemove = useCallback(() => {
      setBaseImage(null);
      setCurrentImageUrl(null); // Clear previous result
  }, []);

  const handleGenerate = useCallback(async () => {
    const effectivePrompt = prompt.trim() || "the creature or object in the image";

    if (isLoading || (!prompt.trim() && !baseImage)) return;

    // Check if premium mode is selected but no API key
    if (generationMode === 'premium' && !falApiKey) {
      showError('Premium mode requires a fal.ai API key. Please add your API key or switch to Free mode.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentImageUrl(null);

    try {
      const url = await generateImage(effectivePrompt, baseImage, selectedStyle, generationMode, falApiKey);
      setCurrentImageUrl(url);
      setHistory(prev => [url, ...prev].slice(0, 4));
      setBaseImage(null); // Clear the base image after successful generation
      success(`Image generated successfully! (${generationMode === 'premium' ? 'Premium' : 'Free'} mode)`);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, baseImage, selectedStyle, generationMode, falApiKey, success, showError]);

  const handleSelectHistoryImage = useCallback((url: string) => {
    setCurrentImageUrl(url);
    setError(null);
  }, []);

  const handleModeChange = useCallback((mode: GenerationMode) => {
    setGenerationMode(mode);
    localStorage.setItem('generation_mode', mode);

    if (mode === 'premium' && !falApiKey) {
      showError('Premium mode requires a fal.ai API key. Get yours free at https://fal.ai/');
    }
  }, [falApiKey, showError]);

  const handleFalApiKeyChange = useCallback((key: string) => {
    setFalApiKey(key);
    localStorage.setItem('fal_api_key', key);
    success('fal.ai API key saved!');
  }, [success]);

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <CookieConsent />

      {showLandingPage ? (
        <LandingPage onGetStarted={() => setShowLandingPage(false)} />
      ) : (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 bg-ghibli-cream dark:bg-gray-900 transition-colors duration-300"
      >
        <main className="w-full max-w-2xl mx-auto flex flex-col items-center flex-grow">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Header onOpenSettings={() => setIsSettingsOpen(true)} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-ghibli-tan/50 dark:border-gray-700 mt-8 transition-colors duration-300"
          >
            <ModeSelector
              mode={generationMode}
              onModeChange={handleModeChange}
              falApiKey={falApiKey}
              onFalApiKeyChange={handleFalApiKeyChange}
              hasBaseImage={!!baseImage}
            />
            <StyleSelector
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              isLoading={isLoading}
            />
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              hasBaseImage={!!baseImage}
              starters={inspirationStarters[selectedStyle] || inspirationStarters['Ghibli-esque']}
            />
            <ImageDisplay
              imageUrl={currentImageUrl}
              isLoading={isLoading}
              error={error}
              baseImage={baseImage}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
          </motion.div>

          {history.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full"
            >
              <ImageHistory history={history} onImageSelect={handleSelectHistoryImage} />
            </motion.div>
          )}
        </main>
        <Footer />

        {/* Settings Modal - Lazy Loaded */}
        {isSettingsOpen && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">Loading...</div>
          </div>}>
            <Settings
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              onSave={handleSaveApiKey}
              currentApiKey={apiKey}
            />
          </Suspense>
        )}
      </motion.div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;