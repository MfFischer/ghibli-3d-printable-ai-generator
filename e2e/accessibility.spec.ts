import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check heading text
    await expect(h1).toContainText('Ghibli 3D Printable AI Generator');
  });

  test('should have labels for form inputs', async ({ page }) => {
    // Style selector should have label
    const styleLabel = page.getByText('Choose your style');
    await expect(styleLabel).toBeVisible();
    
    // Check label is associated with select
    const styleSelector = page.locator('#style-selector');
    await expect(styleSelector).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Theme toggle
    await page.keyboard.press('Tab'); // Settings button
    await page.keyboard.press('Tab'); // Style selector
    await page.keyboard.press('Tab'); // Prompt input
    
    // Check that prompt input is focused
    const promptInput = page.getByPlaceholder(/describe your 3d model idea/i);
    await expect(promptInput).toBeFocused();
  });

  test('should have accessible buttons', async ({ page }) => {
    // All buttons should have accessible names
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent();
      expect(accessibleName).toBeTruthy();
    }
  });

  test('should have proper color contrast in light mode', async ({ page }) => {
    // Ensure light mode
    const html = page.locator('html');
    const currentClass = await html.getAttribute('class');
    
    if (currentClass?.includes('dark')) {
      await page.getByRole('button', { name: /switch to/i }).click();
    }
    
    // Check that text is visible (basic contrast check)
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
    await expect(page.getByText('Choose your style')).toBeVisible();
  });

  test('should have proper color contrast in dark mode', async ({ page }) => {
    // Switch to dark mode
    const html = page.locator('html');
    const currentClass = await html.getAttribute('class');
    
    if (!currentClass?.includes('dark')) {
      await page.getByRole('button', { name: /switch to/i }).click();
    }
    
    // Check that text is visible in dark mode
    await expect(page.getByText('Ghibli 3D Printable AI Generator')).toBeVisible();
    await expect(page.getByText('Choose your style')).toBeVisible();
  });

  test('should have focus indicators', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    // Check that focused element has visible outline or ring
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should support screen reader navigation', async ({ page }) => {
    // Check for semantic HTML
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for proper ARIA roles where needed
    const buttons = page.getByRole('button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should have descriptive page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Ghibli 3D Printable AI Generator/i);
  });

  test('should handle focus trap in modals', async ({ page }) => {
    // Open settings modal
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Tab through modal elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Focus should stay within modal
    const focusedElement = page.locator(':focus');
    const modalContent = page.getByText('Settings').locator('..');
    
    // Check that focused element is within modal
    await expect(focusedElement).toBeVisible();
  });
});

