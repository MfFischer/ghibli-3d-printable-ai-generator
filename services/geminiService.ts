// Hugging Face API configuration
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!HF_API_KEY) {
  console.warn("VITE_HUGGINGFACE_API_KEY not set. Image generation will not work.");
}

// Hugging Face model endpoints for each style
const styleModels: Record<string, { model: string; prompt: string }> = {
    "Ghibli-esque": {
        model: "nitrosocke/Ghibli-Diffusion",
        prompt: "ghibli style, high quality hand-drawn 2D animation, warm nostalgic wholesome aesthetic, Studio Ghibli inspired, soft distinct black line work, gentle cel shading, warm earth tones and pastels, browns cream muted greens soft pinks, soft rounded features, prominent expressive eyes, natural rosy cheeks, soft ambient lighting, concept art for 3D printable object"
    },
    "Pixar 3D": {
        model: "stabilityai/stable-diffusion-2-1",
        prompt: "pixar style 3D render, polished vibrant, smooth surfaces, detailed textures, expressive rounded character design, dynamic soft lighting, depth and realism, bright saturated colors, concept art for 3D printable object, white background"
    },
    "Claymation": {
        model: "stabilityai/stable-diffusion-2-1",
        prompt: "claymation stop-motion style, Aardman Animations inspired, handcrafted tactile aesthetic, visible fingerprints, subtle surface imperfections, exaggerated expressive features, practical warm lighting, physical set, solid matte colors, concept art for 3D printable object, white background"
    },
    "Modern Anime": {
        model: "Linaqruf/anything-v3.0",
        prompt: "modern anime style, vibrant, clean sharp line work, dynamic angles, expressive large eyes, bold cel-shaded colors, dramatic lighting, high contrast, stylized motion, simple abstract background, concept art for 3D printable object"
    },
    "Action Figure": {
        model: "stabilityai/stable-diffusion-2-1",
        prompt: "collectible action figure style, high-quality toy, articulated joints, detailed sculpting, display base, Hot Toys Figma inspired, visible joint lines, slight plastic sheen, detailed paint applications, dynamic heroic pose, display stand, concept art for 3D printable object, white background"
    }
};

const getFullPrompt = (userPrompt: string, style: string) => {
    const styleConfig = styleModels[style] || styleModels['Ghibli-esque'];
    return `${userPrompt}, ${styleConfig.prompt}`;
}

interface BaseImage {
  data: string;
  mimeType: string;
}

export const generateImage = async (userPrompt: string, baseImage: BaseImage | null, style: string): Promise<string> => {
  try {
    if (!HF_API_KEY) {
      throw new Error("Hugging Face API key not configured. Please add VITE_HUGGINGFACE_API_KEY to your .env file.");
    }

    const styleConfig = styleModels[style] || styleModels['Ghibli-esque'];
    const fullPrompt = getFullPrompt(userPrompt, style);

    // Note: Image-to-image is not supported in this basic implementation
    // We'll use text-to-image only for now
    if (baseImage) {
      console.warn("Image-to-image transformation not yet supported with Hugging Face. Using text-to-image instead.");
    }

    // Call Hugging Face Inference API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${styleConfig.model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, text, signature",
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Response is a blob (image data)
    const blob = await response.blob();

    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read image blob"));
      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};