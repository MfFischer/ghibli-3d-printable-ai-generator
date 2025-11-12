/**
 * Generates an OpenSCAD file template for 3D printing
 * This creates a basic parametric model that users can customize
 */

export interface OpenSCADOptions {
  modelName: string;
  baseWidth?: number;
  baseDepth?: number;
  baseHeight?: number;
  includeStand?: boolean;
}

/**
 * Generates OpenSCAD code for a basic 3D printable model
 * Users can import this into OpenSCAD and customize parameters
 */
export const generateOpenSCADCode = (options: OpenSCADOptions): string => {
  const {
    modelName,
    baseWidth = 50,
    baseDepth = 50,
    baseHeight = 2,
    includeStand = true,
  } = options;

  const timestamp = new Date().toISOString().split('T')[0];

  return `// OpenSCAD Model Template
// Generated from: ${modelName}
// Date: ${timestamp}
// 
// INSTRUCTIONS:
// 1. Open this file in OpenSCAD (https://openscad.org/)
// 2. Adjust the parameters below to customize your model
// 3. Use "Design > Automatic Reload and Preview" for live updates
// 4. Export as STL when ready: File > Export > Export as STL
//
// NOTE: This is a template. You'll need to manually model the details
// based on your generated concept art image.

// ===== PARAMETERS (Customize these) =====

// Base dimensions (in mm)
base_width = ${baseWidth};
base_depth = ${baseDepth};
base_height = ${baseHeight};

// Model dimensions (adjust based on your design)
model_height = 30;
model_scale = 1.0;

// Display stand
include_stand = ${includeStand ? 'true' : 'false'};
stand_height = 5;
stand_diameter = 40;

// Quality settings (higher = smoother but slower)
$fn = 50; // Circle resolution

// ===== MODEL CODE =====

module display_base() {
    // Simple rounded base
    translate([0, 0, base_height/2])
    minkowski() {
        cube([base_width - 4, base_depth - 4, base_height/2], center=true);
        cylinder(r=2, h=base_height/2);
    }
}

module display_stand() {
    // Cylindrical stand
    translate([0, 0, base_height + stand_height/2])
    cylinder(d=stand_diameter, h=stand_height, center=true);
}

module main_model() {
    // PLACEHOLDER: Replace this with your actual model
    // This is a simple example - customize based on your concept art
    
    translate([0, 0, base_height + stand_height + model_height/2])
    scale([model_scale, model_scale, model_scale])
    union() {
        // Example: Simple character body
        sphere(d=20);
        
        // Example: Head
        translate([0, 0, 15])
        sphere(d=15);
        
        // Add your custom geometry here
        // Use basic shapes: cube(), cylinder(), sphere()
        // Combine with: union(), difference(), intersection()
        // Transform with: translate(), rotate(), scale()
    }
}

// ===== ASSEMBLY =====

union() {
    // Base
    display_base();
    
    // Stand (optional)
    if (include_stand) {
        display_stand();
    }
    
    // Main model
    main_model();
}

// ===== TIPS =====
// - Use the concept art image as reference
// - Start with basic shapes and combine them
// - Use translate() to position parts
// - Use difference() to cut holes or subtract shapes
// - Test print a small version first!
// 
// OpenSCAD Resources:
// - Cheat Sheet: https://openscad.org/cheatsheet/
// - Tutorial: https://en.wikibooks.org/wiki/OpenSCAD_Tutorial
// - Examples: https://openscad.org/gallery.html
`;
};

/**
 * Downloads the OpenSCAD file
 */
export const downloadOpenSCADFile = (modelName: string, options?: Partial<OpenSCADOptions>) => {
  const code = generateOpenSCADCode({
    modelName,
    ...options,
  });

  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${modelName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_template.scad`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

