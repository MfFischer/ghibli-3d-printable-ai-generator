// Using Pollinations.ai - 100% FREE image generation API
// No API key needed! Works out of the box
// Docs: https://pollinations.ai/

// Style-specific prompt enhancements for Pollinations.ai
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

export const generateImage = async (userPrompt: string, baseImage: BaseImage | null, style: string): Promise<string> => {
  try {
    // Note: Pollinations.ai is text-to-image only
    // When user uploads an image, they should describe what's in it
    // and we'll generate a new image in the selected style based on that description

    let effectivePrompt = userPrompt;
    if (baseImage) {
      // Enhance prompt to indicate we're recreating the uploaded image's subject
      effectivePrompt = `${userPrompt}, detailed recreation, maintaining the subject and key features`;
      console.log('Reference image mode: Creating new image based on your description of the uploaded image');
    }

    const fullPrompt = getFullPrompt(effectivePrompt, style);

    // Pollinations.ai - 100% FREE, no API key needed!
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&enhance=true`;

    console.log('Generating image with Pollinations.ai...');
    console.log('Prompt:', fullPrompt.substring(0, 100) + '...');

    // Fetch the image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status}`);
    }

    // Convert to blob then to base64
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
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