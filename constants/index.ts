/**
 * Application constants
 */

import { ArtStyle } from '../types';

export const APP_NAME = 'Ghibli-esque Trinkets';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Generate ideas for charming 3D-printable creations';

export const ART_STYLES: ArtStyle[] = [
  'Ghibli-esque',
  'Pixar 3D',
  'Claymation',
  'Modern Anime',
  'Action Figure',
];

export const GEMINI_MODEL = 'gemini-2.5-flash-image';

export const MAX_HISTORY_ITEMS = 4;

export const ACCEPTED_IMAGE_TYPES = 'image/png, image/jpeg, image/webp';

export const DEFAULT_OPENSCAD_OPTIONS = {
  baseWidth: 50,
  baseDepth: 50,
  baseHeight: 2,
  includeStand: true,
};

// Style-specific sample prompts
export const SAMPLE_PROMPTS: Record<ArtStyle, string[]> = {
  'Ghibli-esque': [
    'A sleepy bear cub holding a star',
    'A tiny mouse postman with a big letter',
    'A mushroom-shaped house with a glowing window',
    'A cheerful radish spirit with a leaf hat',
    'A forest spirit reading a book under a tree',
    'A chubby cat bus keychain with tiny wheels',
  ],
  'Pixar 3D': [
    'A robot holding a potted plant',
    'A superhero dog with a flowing cape',
    'A magical lamp with swirling smoke',
    'A friendly monster with one big eye',
    'A racing car with expressive headlights',
    'A space explorer with a jetpack',
  ],
  'Claymation': [
    'A penguin wearing a tiny scarf',
    'A garden gnome with a fishing rod',
    'A sheep with fluffy wool texture',
    'A baker holding a tray of cookies',
    'A vintage telephone with googly eyes',
    'A cozy armchair with a reading lamp',
  ],
  'Modern Anime': [
    'A magical girl with flowing ribbons',
    'A cyber ninja with glowing katana',
    'A mecha pilot in dynamic pose',
    'A phoenix rising from flames',
    'A warrior with elemental powers',
    'A mystical fox with multiple tails',
  ],
  'Action Figure': [
    'A space marine with plasma rifle',
    'A medieval knight with sword and shield',
    'A cyberpunk hacker with neon accessories',
    'A samurai warrior in battle stance',
    'A superhero in heroic landing pose',
    'A post-apocalyptic survivor with gear',
  ],
};

export const STYLE_PROMPTS: Record<ArtStyle, string> = {
  'Ghibli-esque': `The image must be in a high-quality, hand-drawn 2D animation style. The aesthetic is warm, nostalgic, and wholesome, deeply inspired by Studio Ghibli films like 'Ponyo' and 'My Neighbor Totoro'. Use soft but distinct black line work, and gentle cel shading. The color palette must be dominated by warm earth tones and pastels (e.g., browns, cream, muted greens, soft pinks). The character or object must have soft, rounded features, prominent, expressive eyes, and natural, rosy cheek color (blush). The overall lighting should be soft and ambient.`,
  'Pixar 3D': `Create a 3D digital render concept art inspired by modern animation studios like Pixar. The style should be polished and vibrant, with smooth surfaces, detailed textures, and expressive, rounded character designs. Emphasize dynamic and soft lighting to create depth and a sense of realism. The color palette should be bright and saturated.`,
  'Claymation': `Create a concept art sketch in a charming claymation stop-motion style inspired by studios like Aardman Animations. The aesthetic should feel handcrafted and tactile, with visible fingerprints, subtle surface imperfections, and exaggerated, expressive features. The lighting should be practical and warm, mimicking a physical set. The colors should be solid and matte.`,
  'Modern Anime': `Create a concept art sketch in a vibrant, modern Japanese anime style. The image should feature clean, sharp line work, dynamic angles, and expressive, large eyes. Use bold, cel-shaded colors and dramatic lighting with high contrast. The character or object should have a sense of action or stylized motion. The background should be simple or abstract to emphasize the subject.`,
  'Action Figure': `Create a concept art sketch in a collectible action figure style. The design should look like a high-quality toy with articulated joints, detailed sculpting, and a display base. The aesthetic should be inspired by premium collectible figures from companies like Hot Toys or Figma. Include visible joint lines at shoulders, elbows, hips, and knees. The surface should have a slight plastic sheen with detailed paint applications. The pose should be dynamic and heroic. Include a simple display stand or base.`,
};

