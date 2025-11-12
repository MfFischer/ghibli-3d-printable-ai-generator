import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasBaseImage: boolean;
  starters: string[];
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading, hasBaseImage, starters }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };
  
  return (
    <div className="w-full">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-ghibli-dark-brown mb-2">
        {hasBaseImage ? "Describe what's in your reference image" : "Describe your creation"}
      </label>
      {hasBaseImage && (
        <p className="text-sm text-ghibli-brown/80 mb-2 bg-ghibli-tan/20 p-2 rounded">
          💡 <strong>Tip:</strong> Describe what you see in your uploaded image (e.g., "a cat sitting on a chair").
          The AI will recreate it in your chosen style!
        </p>
      )}
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={hasBaseImage ? "e.g., a cat sitting on a windowsill" : "e.g., a cheerful radish spirit holding a tiny leaf umbrella"}
        className="w-full h-24 p-3 text-base bg-ghibli-cream border-2 border-ghibli-tan rounded-lg focus:ring-2 focus:ring-ghibli-green focus:border-ghibli-green transition duration-200 resize-none placeholder-ghibli-tan"
        disabled={isLoading}
      />
      {!prompt && !hasBaseImage && (
        <div className="mt-3">
            <p className="text-sm text-ghibli-brown mb-2">Need inspiration? Try one of these:</p>
            <div className="flex flex-wrap gap-2">
                {starters.map((starter) => (
                    <button 
                        key={starter}
                        onClick={() => setPrompt(starter)}
                        className="text-sm bg-ghibli-tan/50 text-ghibli-dark-brown px-3 py-1 rounded-full hover:bg-ghibli-tan transition-colors duration-200"
                    >
                        {starter}
                    </button>
                ))}
            </div>
        </div>
      )}
      <button
        onClick={onGenerate}
        disabled={isLoading || (!prompt.trim() && !hasBaseImage)}
        className="mt-4 w-full bg-ghibli-dark-green text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghibli-dark-green disabled:bg-ghibli-tan disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sketching...
          </>
        ) : (
          'Generate Idea'
        )}
      </button>
    </div>
  );
};