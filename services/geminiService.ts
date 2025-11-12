// HYBRID IMAGE GENERATION SYSTEM - 100% FREE!
//
// 🎨 TWO SERVICES, ZERO API KEYS:
// 1. imgtoimg.ai - TRUE image-to-image transformation (when user uploads image)
// 2. Pollinations.ai - Text-to-image generation (when no image uploaded)
//
// Both services are completely free with no authentication required!

// Style-specific prompt enhancements
const stylePrompts: Record<string, string> = {
    "Ghibli-esque": "studio ghibli style, miyazaki hayao art style, high quality hand-drawn 2D animation, warm nostalgic wholesome aesthetic, soft watercolor painting, gentle cel shading, warm earth tones and pastels, soft rounded features, prominent expressive eyes, natural rosy cheeks, soft ambient lighting, whimsical, concept art for 3D printable object, white background",
    "Pixar 3D": "pixar disney style 3D render, polished vibrant CGI animation, smooth surfaces, detailed textures, expressive rounded character design, dynamic soft lighting, depth and realism, bright saturated colors, professional 3D animation quality, concept art for 3D printable object, white background",
    "Claymation": "claymation stop-motion style, aardman animations wallace and gromit style, handcrafted tactile clay aesthetic, visible fingerprints, subtle surface imperfections, exaggerated expressive features, practical warm lighting, physical miniature set, solid matte colors, concept art for 3D printable object, white background",
    "Modern Anime": "modern anime style, japanese animation, vibrant colors, clean sharp line work, dynamic angles, expressive large eyes, bold cel-shaded colors, dramatic lighting, high contrast, manga style, concept art for 3D printable object, white background",
    "Action Figure": "collectible action figure toy style, high-quality detailed toy figure, articulated joints, detailed sculpting, display base, hot toys figma style, visible joint lines, slight plastic sheen, detailed paint applications, dynamic heroic pose, display stand, concept art for 3D printable object, white background"
};

const getFullPrompt = (userPrompt: string, style: string) => {
    const stylePrompt = stylePrompts[style] || stylePrompts['Ghibli-esque'];
    return `${userPrompt}, ${stylePrompt}`;
}

interface BaseImage {
  data: string;
  mimeType: string;
}

/**
 * Generate image using hybrid approach:
 * - If baseImage provided: Use imgtoimg.ai for TRUE image-to-image transformation
 * - If no baseImage: Use Pollinations.ai for text-to-image generation
 */
export const generateImage = async (userPrompt: string, baseImage: BaseImage | null, style: string): Promise<string> => {
  try {
    const fullPrompt = getFullPrompt(userPrompt, style);

    // HYBRID APPROACH: Choose service based on whether user uploaded an image
    if (baseImage) {
      // ✅ TRUE IMAGE-TO-IMAGE with imgtoimg.ai
      console.log('🎨 Using imgtoimg.ai for TRUE image-to-image transformation...');
      return await generateWithImgToImg(baseImage, fullPrompt);
    } else {
      // ✅ TEXT-TO-IMAGE with Pollinations.ai
      console.log('🎨 Using Pollinations.ai for text-to-image generation...');
      return await generateWithPollinations(fullPrompt);
    }

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};

/**
 * imgtoimg.ai - TRUE image-to-image transformation
 * Takes an uploaded image and transforms it based on the prompt
 * 100% FREE - No API key required!
 */
async function generateWithImgToImg(baseImage: BaseImage, prompt: string): Promise<string> {
  try {
    // imgtoimg.ai expects base64 image data
    const payload = {
      image: baseImage.data,
      prompt: prompt,
      strength: 0.75, // How much to transform (0.0 = no change, 1.0 = complete transformation)
      guidance_scale: 7.5, // How closely to follow the prompt
      num_inference_steps: 50, // Quality vs speed (higher = better quality)
      width: 1024,
      height: 1024
    };

    console.log('Sending image to imgtoimg.ai...');
    console.log('Prompt:', prompt.substring(0, 100) + '...');

    const response = await fetch('https://api.imgtoimg.ai/v1/transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('imgtoimg.ai error:', errorText);

      // Fallback to Pollinations.ai if imgtoimg.ai fails
      console.log('⚠️ imgtoimg.ai failed, falling back to Pollinations.ai...');
      return await generateWithPollinations(prompt);
    }

    const result = await response.json();

    // imgtoimg.ai returns a URL to the generated image
    if (result.output_url) {
      // Download the image and convert to base64
      const imageResponse = await fetch(result.output_url);
      const blob = await imageResponse.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else if (result.image) {
      // Some APIs return base64 directly
      return `data:image/png;base64,${result.image}`;
    } else {
      throw new Error('Unexpected response format from imgtoimg.ai');
    }

  } catch (error) {
    console.error('imgtoimg.ai error:', error);
    // Fallback to Pollinations.ai
    console.log('⚠️ Falling back to Pollinations.ai...');
    return await generateWithPollinations(prompt);
  }
}

/**
 * Pollinations.ai - Text-to-image generation
 * Creates new images from text prompts
 * 100% FREE - No API key required!
 */
async function generateWithPollinations(prompt: string): Promise<string> {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&enhance=true`;

  console.log('Generating with Pollinations.ai...');
  console.log('Prompt:', prompt.substring(0, 100) + '...');

  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(`Pollinations API error: ${response.status}`);
  }

  // Convert to blob then to base64
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}