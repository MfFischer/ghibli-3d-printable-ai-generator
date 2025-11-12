import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../components/Header';
import { ThemeProvider } from '../../contexts/ThemeContext';

describe('Header Component', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders the app title', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Ghibli-esque Trinkets')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Generate ideas for charming 3D-printable creations.')).toBeInTheDocument();
  });

  it('renders settings button when onOpenSettings is provided', () => {
    const mockOnOpenSettings = jest.fn();
    renderWithTheme(<Header onOpenSettings={mockOnOpenSettings} />);
    
    const settingsButton = screen.getByLabelText('Open settings');
    expect(settingsButton).toBeInTheDocument();
  });

  it('calls onOpenSettings when settings button is clicked', () => {
    const mockOnOpenSettings = jest.fn();
    renderWithTheme(<Header onOpenSettings={mockOnOpenSettings} />);
    
    const settingsButton = screen.getByLabelText('Open settings');
    fireEvent.click(settingsButton);
    
    expect(mockOnOpenSettings).toHaveBeenCalledTimes(1);
  });

  it('does not render settings button when onOpenSettings is not provided', () => {
    renderWithTheme(<Header />);
    
    const settingsButton = screen.queryByLabelText('Open settings');
    expect(settingsButton).not.toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Header />);
    
    const themeToggle = screen.getByRole('button', { name: /switch to/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    renderWithTheme(<Header />);
    
    const themeToggle = screen.getByRole('button', { name: /switch to/i });
    const initialTheme = document.documentElement.classList.contains('dark');
    
    fireEvent.click(themeToggle);
    
    const newTheme = document.documentElement.classList.contains('dark');
    expect(newTheme).not.toBe(initialTheme);
  });
});

