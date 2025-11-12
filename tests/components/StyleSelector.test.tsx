import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyleSelector } from '../../components/StyleSelector';
import { ArtStyle } from '../../types';

describe('StyleSelector Component', () => {
  const mockSetSelectedStyle = jest.fn();
  const defaultProps = {
    selectedStyle: 'Ghibli-esque' as ArtStyle,
    setSelectedStyle: mockSetSelectedStyle,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all art style options', () => {
    render(<StyleSelector {...defaultProps} />);
    
    expect(screen.getByText('Ghibli-esque')).toBeInTheDocument();
    expect(screen.getByText('Pixar 3D')).toBeInTheDocument();
    expect(screen.getByText('Claymation')).toBeInTheDocument();
    expect(screen.getByText('Modern Anime')).toBeInTheDocument();
    expect(screen.getByText('Action Figure')).toBeInTheDocument();
  });

  it('highlights the selected style', () => {
    render(<StyleSelector {...defaultProps} />);
    
    const selectedButton = screen.getByText('Ghibli-esque').closest('button');
    expect(selectedButton).toHaveClass('ring-2');
  });

  it('calls setSelectedStyle when a style is clicked', () => {
    render(<StyleSelector {...defaultProps} />);
    
    const pixarButton = screen.getByText('Pixar 3D');
    fireEvent.click(pixarButton);
    
    expect(mockSetSelectedStyle).toHaveBeenCalledWith('Pixar 3D');
  });

  it('disables buttons when loading', () => {
    render(<StyleSelector {...defaultProps} isLoading={true} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('enables buttons when not loading', () => {
    render(<StyleSelector {...defaultProps} isLoading={false} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });

  it('renders style descriptions', () => {
    render(<StyleSelector {...defaultProps} />);
    
    expect(screen.getByText(/Hand-drawn, whimsical/i)).toBeInTheDocument();
  });

  it('changes selection when different style is clicked', () => {
    const { rerender } = render(<StyleSelector {...defaultProps} />);
    
    const claymationButton = screen.getByText('Claymation');
    fireEvent.click(claymationButton);
    
    expect(mockSetSelectedStyle).toHaveBeenCalledWith('Claymation');
    
    // Simulate parent updating the prop
    rerender(<StyleSelector {...defaultProps} selectedStyle="Claymation" />);
    
    const selectedButton = screen.getByText('Claymation').closest('button');
    expect(selectedButton).toHaveClass('ring-2');
  });
});

