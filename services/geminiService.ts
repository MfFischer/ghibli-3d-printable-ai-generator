// Hugging Face API configuration
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!HF_API_KEY) {
  console.warn("VITE_HUGGINGFACE_API_KEY not set. Image generation will not work.");
}

// Hugging Face model endpoints for each style
// Using actively maintained and working models
const styleModels: Record<string, { model: string; prompt: string }> = {
    "Ghibli-esque": {
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: "studio ghibli style, miyazaki hayao art style, high quality hand-drawn 2D animation, warm nostalgic wholesome aesthetic, soft watercolor painting, gentle cel shading, warm earth tones and pastels, soft rounded features, prominent expressive eyes, natural rosy cheeks, soft ambient lighting, whimsical, concept art for 3D printable object, white background"
    },
    "Pixar 3D": {
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: "pixar disney style 3D render, polished vibrant CGI animation, smooth surfaces, detailed textures, expressive rounded character design, dynamic soft lighting, depth and realism, bright saturated colors, professional 3D animation quality, concept art for 3D printable object, white background"
    },
    "Claymation": {
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: "claymation stop-motion style, aardman animations wallace and gromit style, handcrafted tactile clay aesthetic, visible fingerprints, subtle surface imperfections, exaggerated expressive features, practical warm lighting, physical miniature set, solid matte colors, concept art for 3D printable object, white background"
    },
    "Modern Anime": {
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: "modern anime style, japanese animation, vibrant colors, clean sharp line work, dynamic angles, expressive large eyes, bold cel-shaded colors, dramatic lighting, high contrast, manga style, concept art for 3D printable object, white background"
    },
    "Action Figure": {
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: "collectible action figure toy style, high-quality detailed toy figure, articulated joints, detailed sculpting, display base, hot toys figma style, visible joint lines, slight plastic sheen, detailed paint applications, dynamic heroic pose, display stand, concept art for 3D printable object, white background"
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
    const styleConfig = styleModels[style] || styleModels['Ghibli-esque'];
    const fullPrompt = getFullPrompt(userPrompt, style);

    // Note: Image-to-image is not supported in this basic implementation
    // We'll use text-to-image only for now
    if (baseImage) {
      console.warn("Image-to-image transformation not yet supported with Hugging Face. Using text-to-image instead.");
    }

    // Call our proxy server instead of HF API directly (to avoid CORS)
    const response = await fetch('http://localhost:3001/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: styleConfig.model,
        prompt: fullPrompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, text, signature",
          num_inference_steps: 30,
          guidance_scale: 7.5,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Proxy server error: ${response.status}`);
    }

    const data = await response.json();
    return data.image;

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};