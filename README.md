<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🎨 Ghibli Trinkets - 3D Model Idea Generator

**Generate charming, 3D-printable concept art in multiple art styles**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-28.0-47848f)](https://www.electronjs.org/)

</div>

---

## ✨ Features

### 🎭 **Multiple Art Styles**
- **Ghibli-esque**: Warm, nostalgic hand-drawn animation style
- **Pixar 3D**: Polished, vibrant 3D digital renders
- **Claymation**: Charming stop-motion aesthetic with tactile feel
- **Modern Anime**: Vibrant Japanese anime with dynamic angles
- **Action Figure**: Collectible toy design with articulated joints

### 🖼️ **Dual Input Modes**
- **Text Prompts**: Describe your creation in natural language
- **Image Upload**: Transform existing images into new art styles

### 🎯 **3D Printing Ready**
- **PNG Export**: High-quality concept art images
- **OpenSCAD Templates**: Parametric 3D model templates for customization
- Optimized for decorations, keyholders, and table weights

### 💾 **Generation History**
- View your last 4 creations
- Quick access to previous generations
- One-click re-selection

### 🎨 **Style-Specific Prompts**
- Curated sample prompts for each art style
- Quick-start inspiration buttons
- Context-aware suggestions

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Hugging Face API Token** ([Get one free](https://huggingface.co/settings/tokens)) - **100% Free, No Credit Card!**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MfFischer/ghibli-3d-printable-ai-generator.git
   cd ghibli-3d-printable-ai-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Hugging Face API token:
   ```env
   VITE_HUGGINGFACE_API_KEY=your_hf_token_here
   ```

   **How to get your free Hugging Face token:**
   1. Go to https://huggingface.co/settings/tokens
   2. Click "New token"
   3. Name: `ghibli-3d-generator`
   4. Type: **Read**
   5. Click "Generate" and copy the token (starts with `hf_...`)

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖥️ Desktop App (Electron)

### Run Desktop App in Development
```bash
npm run electron:dev
```

### Build Desktop App

**Windows:**
```bash
npm run electron:build:win
```

**macOS:**
```bash
npm run electron:build:mac
```

**Linux:**
```bash
npm run electron:build:linux
```

The built application will be in the `dist-electron` folder.

---

## 📁 Project Structure

```
ghibli-trinkets/
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PromptInput.tsx
│   ├── StyleSelector.tsx
│   ├── ImageDisplay.tsx
│   ├── ImageHistory.tsx
│   └── icons/          # SVG icon components
├── services/           # API services
│   └── geminiService.ts
├── utils/              # Utility functions
│   └── openscadGenerator.ts
├── types/              # TypeScript type definitions
│   ├── index.ts
│   └── electron.d.ts
├── constants/          # App constants
│   └── index.ts
├── electron/           # Electron main process
│   ├── main.js
│   └── preload.js
├── public/             # Static assets
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.html          # HTML template
```

---

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run electron:dev` | Run Electron app in development |
| `npm run electron:build` | Build Electron app for all platforms |

### Code Quality

This project uses:
- **TypeScript** with strict mode
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks (optional)

---

## 🎨 Usage Guide

### 1. Select Your Art Style
Choose from 5 different art styles using the dropdown menu.

### 2. Create Your Design
**Option A: Text Prompt**
- Type a description of what you want to create
- Use the sample prompts for inspiration
- Press "Generate Idea" or hit Enter

**Option B: Image Upload**
- Click "Upload Image" to select a base image
- Optionally add a text prompt to describe changes
- Press "Generate Idea"

### 3. Download Your Creation
- **Download PNG**: Get the concept art image
- **OpenSCAD Template**: Get a parametric 3D model template

### 4. 3D Print Your Design
1. Open the `.scad` file in [OpenSCAD](https://openscad.org/)
2. Customize parameters (size, base, stand)
3. Export as STL
4. Slice and print!

---

## 🔑 API Key Management

### Web Version
Set your API key in `.env.local`:
```env
GEMINI_API_KEY=your_key_here
```

### Desktop App
The desktop app will include a settings panel for secure API key storage using encrypted local storage.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Inspired by Studio Ghibli's timeless art style
- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [Electron](https://www.electronjs.org/)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/MfFischer/ghibli-3d-printable-ai-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MfFischer/ghibli-3d-printable-ai-generator/discussions)

---

<div align="center">

**Made with ❤️ for the 3D printing community**

[⭐ Star this repo](https://github.com/yourusername/ghibli-trinkets) | [🐛 Report Bug](https://github.com/yourusername/ghibli-trinkets/issues) | [✨ Request Feature](https://github.com/yourusername/ghibli-trinkets/issues)

</div>
