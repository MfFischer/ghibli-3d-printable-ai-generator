// HYBRID AI IMAGE GENERATION SYSTEM
//
// 🎨 TWO MODES:
// 1. FREE MODE (Pollinations.ai):
//    - Text-to-image generation
//    - Reference mode: User describes uploaded image
//    - No API key required
//    - Unlimited usage
//
// 2. PREMIUM MODE (fal.ai):
//    - TRUE image-to-image transformation
//    - Upload image → AI transforms it directly
//    - Requires API key (free credits available)
//    - Higher quality results

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

export interface BaseImage {
  data: string;
  mimeType: string;
}

export type GenerationMode = 'free' | 'premium';

/**
 * Generate image using hybrid approach
 * - Free mode: Pollinations.ai (text-to-image)
 * - Premium mode: fal.ai (true image-to-image)
 */
export const generateImage = async (
  userPrompt: string,
  baseImage: BaseImage | null,
  style: string,
  mode: GenerationMode = 'free',
  falApiKey?: string
): Promise<string> => {
  try {
    const fullPrompt = getFullPrompt(userPrompt, style);

    // PREMIUM MODE: Use fal.ai for TRUE image-to-image transformation
    if (mode === 'premium' && baseImage && falApiKey) {
      console.log('✨ PREMIUM MODE: Using fal.ai for TRUE image-to-image transformation');
      return await generateWithFalAI(baseImage, fullPrompt, falApiKey);
    }

    // FREE MODE: Use Pollinations.ai
    if (baseImage) {
      // Enhance prompt for reference mode
      const enhancedPrompt = `${userPrompt}, detailed recreation in the described style, maintaining key features and composition`;
      const fullEnhancedPrompt = getFullPrompt(enhancedPrompt, style);
      console.log('🎨 FREE MODE (Reference): Generating new image based on your description');
      return await generateWithPollinations(fullEnhancedPrompt);
    } else {
      console.log('🎨 FREE MODE: Text-to-image generation');
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
 * fal.ai - TRUE image-to-image transformation (PREMIUM)
 * Transforms uploaded images directly using FLUX.1 model
 * Requires API key (free credits available at https://fal.ai/)
 */
async function generateWithFalAI(baseImage: BaseImage, prompt: string, apiKey: string): Promise<string> {
  try {
    // Convert base64 to blob URL for fal.ai
    const base64Data = baseImage.data.includes('base64,')
      ? baseImage.data.split('base64,')[1]
      : baseImage.data;

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: baseImage.mimeType });

    // Create a temporary URL for the image
    const imageUrl = URL.createObjectURL(blob);

    console.log('Sending image to fal.ai FLUX.1 image-to-image...');
    console.log('Prompt:', prompt.substring(0, 100) + '...');

    const response = await fetch('https://fal.run/fal-ai/flux/dev/image-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        prompt: prompt,
        strength: 0.85, // How much to transform (0.0 = no change, 1.0 = complete transformation)
        guidance_scale: 3.5, // How closely to follow the prompt
        num_inference_steps: 40, // Quality vs speed
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg'
      })
    });

    // Clean up the temporary URL
    URL.revokeObjectURL(imageUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('fal.ai error:', errorText);

      // Fallback to Pollinations.ai if fal.ai fails
      console.log('⚠️ fal.ai failed, falling back to FREE mode (Pollinations.ai)...');
      return await generateWithPollinations(prompt);
    }

    const result = await response.json();

    // fal.ai returns images array with URLs
    if (result.images && result.images.length > 0) {
      const imageUrl = result.images[0].url;

      // Download the image and convert to base64
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      throw new Error('Unexpected response format from fal.ai');
    }

  } catch (error) {
    console.error('fal.ai error:', error);
    // Fallback to Pollinations.ai
    console.log('⚠️ Falling back to FREE mode (Pollinations.ai)...');
    return await generateWithPollinations(prompt);
  }
}

/**
 * Pollinations.ai - Text-to-image generation (FREE)
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