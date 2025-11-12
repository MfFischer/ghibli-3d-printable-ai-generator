import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const basePrompt = `The final creation must faithfully represent the user's prompt of "[USER_PROMPT]". The object should be centered on a plain, light-colored background. The final image should clearly show a small decorative item, keyholder, or table weight, ready for 3D modeling.`;

const basePromptWithImage = `Based on the provided image, create a new concept art sketch for a 3D printable object. The object should be a version of "[USER_PROMPT]", transformed to fit the following style.
IMPORTANT: If the uploaded image contains a person, the output MUST be a stylized drawing of that person. Do NOT transform people into animals or objects. Faithfully translate the subject into the specified art style.`;

const stylePrompts: Record<string, string> = {
    "Ghibli-esque": `The image must be in a high-quality, hand-drawn 2D animation style. The aesthetic is warm, nostalgic, and wholesome, deeply inspired by Studio Ghibli films like 'Ponyo' and 'My Neighbor Totoro'. Use soft but distinct black line work, and gentle cel shading. The color palette must be dominated by warm earth tones and pastels (e.g., browns, cream, muted greens, soft pinks). The character or object must have soft, rounded features, prominent, expressive eyes, and natural, rosy cheek color (blush). The overall lighting should be soft and ambient.`,
    "Pixar 3D": `Create a 3D digital render concept art inspired by modern animation studios like Pixar. The style should be polished and vibrant, with smooth surfaces, detailed textures, and expressive, rounded character designs. Emphasize dynamic and soft lighting to create depth and a sense of realism. The color palette should be bright and saturated.`,
    "Claymation": `Create a concept art sketch in a charming claymation stop-motion style inspired by studios like Aardman Animations. The aesthetic should feel handcrafted and tactile, with visible fingerprints, subtle surface imperfections, and exaggerated, expressive features. The lighting should be practical and warm, mimicking a physical set. The colors should be solid and matte.`,
    "Modern Anime": `Create a concept art sketch in a vibrant, modern Japanese anime style. The image should feature clean, sharp line work, dynamic angles, and expressive, large eyes. Use bold, cel-shaded colors and dramatic lighting with high contrast. The character or object should have a sense of action or stylized motion. The background should be simple or abstract to emphasize the subject.`,
    "Action Figure": `Create a concept art sketch in a collectible action figure style. The design should look like a high-quality toy with articulated joints, detailed sculpting, and a display base. The aesthetic should be inspired by premium collectible figures from companies like Hot Toys or Figma. Include visible joint lines at shoulders, elbows, hips, and knees. The surface should have a slight plastic sheen with detailed paint applications. The pose should be dynamic and heroic. Include a simple display stand or base.`
};

const getFullPrompt = (userPrompt: string, style: string, hasImage: boolean) => {
    const styleDefinition = stylePrompts[style] || stylePrompts['Ghibli-esque'];
    const base = hasImage ? basePromptWithImage : basePrompt;
    return `${styleDefinition} ${base}`.replace('[USER_PROMPT]', userPrompt);
}

interface BaseImage {
  data: string;
  mimeType: string;
}

export const generateImage = async (userPrompt: string, baseImage: BaseImage | null, style: string): Promise<string> => {
  try {
    const promptToUse = getFullPrompt(userPrompt, style, !!baseImage);
    
    const parts: any[] = [];
    if (baseImage) {
      parts.push({
        inlineData: {
          data: baseImage.data,
          mimeType: baseImage.mimeType,
        },
      });
    }
    parts.push({ text: promptToUse });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("No image was generated. The model may have refused the prompt.");

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};