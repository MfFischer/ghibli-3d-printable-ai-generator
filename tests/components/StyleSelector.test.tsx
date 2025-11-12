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

  it('renders the select dropdown', () => {
    render(<StyleSelector {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('Ghibli-esque');
  });

  it('calls setSelectedStyle when a style is selected', () => {
    render(<StyleSelector {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Pixar 3D' } });

    expect(mockSetSelectedStyle).toHaveBeenCalledWith('Pixar 3D');
  });

  it('disables select when loading', () => {
    render(<StyleSelector {...defaultProps} isLoading={true} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('enables select when not loading', () => {
    render(<StyleSelector {...defaultProps} isLoading={false} />);

    const select = screen.getByRole('combobox');
    expect(select).not.toBeDisabled();
  });

  it('renders the label', () => {
    render(<StyleSelector {...defaultProps} />);

    expect(screen.getByText('Choose your style')).toBeInTheDocument();
  });

  it('changes selection when different style is selected', () => {
    const { rerender } = render(<StyleSelector {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Claymation' } });

    expect(mockSetSelectedStyle).toHaveBeenCalledWith('Claymation');

    // Simulate parent updating the prop
    rerender(<StyleSelector {...defaultProps} selectedStyle="Claymation" />);

    expect(select).toHaveValue('Claymation');
  });

  it('has correct styling classes', () => {
    render(<StyleSelector {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('w-full', 'appearance-none', 'bg-ghibli-cream');
  });
});

