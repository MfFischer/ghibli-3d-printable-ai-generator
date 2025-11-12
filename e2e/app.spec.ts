import { test, expect } from '@playwright/test';

test.describe('Ghibli 3D Printable AI Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main page with all components', async ({ page }) => {
    // Check header
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
    
    // Check style selector
    await expect(page.getByText('Choose your style')).toBeVisible();
    
    // Check prompt input
    await expect(page.getByPlaceholder(/describe your 3d model idea/i)).toBeVisible();
    
    // Check generate button
    await expect(page.getByRole('button', { name: /generate/i })).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    // Get initial theme
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    
    // Click theme toggle
    await page.getByRole('button', { name: /switch to/i }).click();
    
    // Check theme changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('should select different art styles', async ({ page }) => {
    const styleSelector = page.locator('#style-selector');
    
    // Check default style
    await expect(styleSelector).toHaveValue('Ghibli-esque');
    
    // Change to Pixar 3D
    await styleSelector.selectOption('Pixar 3D');
    await expect(styleSelector).toHaveValue('Pixar 3D');
    
    // Change to Claymation
    await styleSelector.selectOption('Claymation');
    await expect(styleSelector).toHaveValue('Claymation');
  });

  test('should show sample prompts', async ({ page }) => {
    // Check that sample prompts section exists
    await expect(page.getByText('Sample Prompts')).toBeVisible();
    
    // Check that there are prompt buttons
    const promptButtons = page.getByRole('button').filter({ hasText: /^[A-Z]/ });
    const count = await promptButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should use sample prompt when clicked', async ({ page }) => {
    const promptInput = page.getByPlaceholder(/describe your 3d model idea/i);
    
    // Click first sample prompt
    const firstPrompt = page.getByRole('button').filter({ hasText: /^[A-Z]/ }).first();
    const promptText = await firstPrompt.textContent();
    await firstPrompt.click();
    
    // Check that prompt was filled
    await expect(promptInput).toHaveValue(promptText || '');
  });

  test('should validate empty prompt', async ({ page }) => {
    const generateButton = page.getByRole('button', { name: /generate/i });
    
    // Try to generate without prompt
    await generateButton.click();
    
    // Should show error toast (wait for it to appear)
    await expect(page.getByText(/please enter a prompt/i)).toBeVisible({ timeout: 2000 });
  });

  test('should open settings modal', async ({ page }) => {
    // Click settings button
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Check modal is visible
    await expect(page.getByText('Settings')).toBeVisible();
    await expect(page.getByText('Google Gemini API Key')).toBeVisible();
  });

  test('should close settings modal', async ({ page }) => {
    // Open settings
    await page.getByRole('button', { name: /settings/i }).click();
    await expect(page.getByText('Settings')).toBeVisible();
    
    // Close settings
    await page.getByRole('button', { name: /close/i }).click();
    
    // Modal should be hidden
    await expect(page.getByText('Google Gemini API Key')).not.toBeVisible();
  });

  test('should have responsive layout', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
  });

  test('should persist theme preference', async ({ page, context }) => {
    // Set theme to dark
    const html = page.locator('html');
    await page.getByRole('button', { name: /switch to/i }).click();
    const darkClass = await html.getAttribute('class');
    
    // Reload page
    await page.reload();
    
    // Theme should persist
    const persistedClass = await html.getAttribute('class');
    expect(persistedClass).toBe(darkClass);
  });

  test('should display footer with legal links', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer exists
    await expect(page.getByText(/© 2025/i)).toBeVisible();
  });
});

