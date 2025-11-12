// POLLINATIONS.AI - 100% FREE TEXT-TO-IMAGE GENERATION
//
// 🎨 FREE IMAGE GENERATION:
// - Text-to-image: Create images from text descriptions
// - Image reference mode: User describes uploaded image, AI generates new version
// - No API keys required!
// - Unlimited usage
//
// Note: This is text-to-image only. For true image-to-image transformation,
// paid services like Replicate or fal.ai would be needed.

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
 * Generate image using Pollinations.ai
 * - If baseImage provided: User describes the image, AI generates a new version based on description
 * - If no baseImage: Standard text-to-image generation
 */
export const generateImage = async (userPrompt: string, baseImage: BaseImage | null, style: string): Promise<string> => {
  try {
    let effectivePrompt = userPrompt;

    if (baseImage) {
      // Enhance prompt to indicate we're recreating based on user's description
      effectivePrompt = `${userPrompt}, detailed recreation in the described style, maintaining key features and composition`;
      console.log('🎨 Reference image mode: Generating new image based on your description');
    } else {
      console.log('🎨 Text-to-image mode: Generating from scratch');
    }

    const fullPrompt = getFullPrompt(effectivePrompt, style);
    return await generateWithPollinations(fullPrompt);

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};

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