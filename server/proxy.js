import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Proxy server is running' });
});

// Proxy endpoint for Hugging Face API
app.post('/api/generate-image', async (req, res) => {
  try {
    const { model, prompt, parameters } = req.body;

    if (!model || !prompt) {
      return res.status(400).json({ error: 'Model and prompt are required' });
    }

    const HF_API_KEY = process.env.VITE_HUGGINGFACE_API_KEY;

    if (!HF_API_KEY) {
      return res.status(500).json({ error: 'Hugging Face API key not configured' });
    }

    console.log(`Generating image with model: ${model}`);
    console.log(`Prompt: ${prompt.substring(0, 100)}...`);

    // Call Hugging Face Serverless Inference API
    // Using the free tier endpoint
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: parameters || {
            negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, text, signature",
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HF API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Hugging Face API error: ${response.status}`,
        details: errorText 
      });
    }

    // Get image as buffer
    const imageBuffer = await response.buffer();
    
    // Convert to base64
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    console.log('Image generated successfully!');
    res.json({ image: dataUrl });

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to generate image', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for http://localhost:3000`);
});

