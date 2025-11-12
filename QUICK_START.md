# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React, TypeScript, Vite
- Electron and electron-builder
- ESLint, Prettier
- All other dependencies

## Step 2: Set Up API Key

1. Get your free Gemini API key from: https://ai.google.dev/gemini-api/docs/api-key

2. Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Step 3: Run the App

### Option A: Web Version (Recommended for Development)
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.

### Option B: Desktop App
```bash
npm run electron:dev
```
This will start both the Vite dev server and Electron app.

## Step 4: Test the Features

1. **Select an Art Style**: Choose from the dropdown (Ghibli-esque, Pixar 3D, etc.)
2. **Enter a Prompt**: Type a description or click a sample prompt
3. **Generate**: Click "Generate Idea" or press Enter
4. **Download**: 
   - Click "Download PNG" for the image
   - Click "OpenSCAD Template" for 3D printing template

## Step 5: Configure Settings (Desktop App)

1. Click the ⚙️ settings icon in the header
2. Enter your Gemini API key
3. Click "Save"

The API key will be stored securely in the desktop app.

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web development server |
| `npm run build` | Build for production |
| `npm run lint` | Check code for errors |
| `npm run lint:fix` | Auto-fix linting errors |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |
| `npm run electron:dev` | Run desktop app in dev mode |
| `npm run electron:build:win` | Build Windows installer |

---

## 🎨 Usage Tips

### Sample Prompts
Each art style has 6 curated sample prompts. Click any prompt button to auto-fill the input.

### Image Upload
1. Click "Upload Image" in the canvas area
2. Select a PNG, JPEG, or WebP image
3. Optionally add a text prompt to describe changes
4. Generate!

### OpenSCAD Workflow
1. Generate your concept art
2. Download the OpenSCAD template
3. Open in OpenSCAD (https://openscad.org/)
4. Customize parameters (size, base, stand)
5. Export as STL
6. Slice and 3D print!

---

## 🐛 Troubleshooting

### "API_KEY environment variable not set"
- Make sure `.env.local` exists with your API key
- Restart the dev server after creating `.env.local`

### Electron app won't start
- Make sure you ran `npm install` first
- Try `npm run dev` first to ensure the web version works
- Check that port 3000 is not already in use

### TypeScript errors
- Run `npm run type-check` to see all type errors
- Make sure all dependencies are installed

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

---

## 📦 Building for Production

### Windows Installer
```bash
npm run electron:build:win
```
Output: `dist-electron/Ghibli Trinkets Setup.exe`

### macOS DMG
```bash
npm run electron:build:mac
```
Output: `dist-electron/Ghibli Trinkets.dmg`

### Linux AppImage
```bash
npm run electron:build:linux
```
Output: `dist-electron/Ghibli Trinkets.AppImage`

---

## 🎯 What's Next?

After getting the app running, you can:
1. Customize the UI colors and styling
2. Add more art styles
3. Implement additional features
4. Create app icons for distribution
5. Set up auto-updates
6. Add analytics and crash reporting

---

## 💡 Pro Tips

- Use `Cmd/Ctrl + ,` to open settings in desktop app
- Press `Enter` in the prompt input to generate
- The last 4 generations are saved in history
- Click any history image to view it again
- Desktop app works offline (after initial setup)

---

## 🆘 Need Help?

- Check IMPLEMENTATION_STATUS.md for feature details
- Read README.md for comprehensive documentation
- Open an issue on GitHub
- Check the console for error messages

Happy creating! 🎨✨

