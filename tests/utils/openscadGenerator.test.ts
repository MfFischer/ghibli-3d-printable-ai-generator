import { generateOpenSCADCode } from '../../utils/openscadGenerator';

describe('OpenSCAD Generator', () => {
  it('generates valid OpenSCAD code with default options', () => {
    const code = generateOpenSCADCode({ modelName: 'test-model' });

    expect(code).toContain('// Generated from: test-model');
    expect(code).toContain('base_width = 50;');
    expect(code).toContain('base_depth = 50;');
    expect(code).toContain('base_height = 2;');
    expect(code).toContain('include_stand = true;');
  });

  it('generates code with custom dimensions', () => {
    const code = generateOpenSCADCode({
      modelName: 'custom-model',
      baseWidth: 100,
      baseDepth: 80,
      baseHeight: 5,
    });

    expect(code).toContain('base_width = 100;');
    expect(code).toContain('base_depth = 80;');
    expect(code).toContain('base_height = 5;');
  });

  it('includes stand when includeStand is true', () => {
    const code = generateOpenSCADCode({
      modelName: 'model-with-stand',
      includeStand: true,
    });

    expect(code).toContain('include_stand = true;');
    expect(code).toContain('stand_height = 5;');
  });

  it('excludes stand when includeStand is false', () => {
    const code = generateOpenSCADCode({
      modelName: 'model-without-stand',
      includeStand: false,
    });

    expect(code).toContain('include_stand = false;');
  });

  it('includes base module', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    expect(code).toContain('module display_base()');
    expect(code).toContain('cube([base_width - 4, base_depth - 4, base_height/2], center=true);');
  });

  it('includes stand module', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    expect(code).toContain('module display_stand()');
    expect(code).toContain('if (include_stand)');
  });

  it('includes model placeholder', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    expect(code).toContain('module main_model()');
    expect(code).toContain('// PLACEHOLDER: Replace this with your actual model');
  });

  it('includes assembly instructions', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    expect(code).toContain('// ===== ASSEMBLY =====');
    expect(code).toContain('display_base();');
    expect(code).toContain('display_stand();');
    expect(code).toContain('main_model();');
  });

  it('includes helpful comments', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    expect(code).toContain('// ===== PARAMETERS (Customize these) =====');
    expect(code).toContain('// ===== MODEL CODE =====');
    expect(code).toContain('// - Use the concept art image as reference');
  });

  it('generates syntactically valid OpenSCAD code', () => {
    const code = generateOpenSCADCode({ modelName: 'test' });

    // Check for balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    expect(openBraces).toBe(closeBraces);

    // Check for balanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    expect(openParens).toBe(closeParens);

    // Check for balanced brackets
    const openBrackets = (code.match(/\[/g) || []).length;
    const closeBrackets = (code.match(/\]/g) || []).length;
    expect(openBrackets).toBe(closeBrackets);
  });

  it('uses model name in comments', () => {
    const modelName = 'my-awesome-model';
    const code = generateOpenSCADCode({ modelName });

    expect(code).toContain(`// Generated from: ${modelName}`);
  });

  it('handles special characters in model name', () => {
    const modelName = 'model-with-special_chars!@#';
    const code = generateOpenSCADCode({ modelName });

    expect(code).toContain(modelName);
    expect(code).toBeTruthy();
  });
});

