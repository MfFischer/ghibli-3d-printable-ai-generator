import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toast, ToastContainer } from '../../components/Toast';

describe('Toast Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders success toast with correct styling', () => {
    render(<Toast message="Success!" type="success" onClose={mockOnClose} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders error toast with correct styling', () => {
    render(<Toast message="Error occurred" type="error" onClose={mockOnClose} />);
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders info toast with correct styling', () => {
    render(<Toast message="Information" type="info" onClose={mockOnClose} />);
    
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('renders warning toast with correct styling', () => {
    render(<Toast message="Warning!" type="warning" onClose={mockOnClose} />);
    
    expect(screen.getByText('Warning!')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast message="Test" type="info" onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after duration', () => {
    render(<Toast message="Test" type="info" onClose={mockOnClose} duration={3000} />);
    
    expect(mockOnClose).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(3000);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('uses custom duration', () => {
    render(<Toast message="Test" type="info" onClose={mockOnClose} duration={5000} />);
    
    jest.advanceTimersByTime(3000);
    expect(mockOnClose).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(2000);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

describe('ToastContainer Component', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders multiple toasts', () => {
    const toasts = [
      { id: '1', message: 'First toast', type: 'success' as const },
      { id: '2', message: 'Second toast', type: 'error' as const },
    ];

    render(<ToastContainer toasts={toasts} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
  });

  it('renders empty container when no toasts', () => {
    const { container } = render(<ToastContainer toasts={[]} onRemove={mockOnRemove} />);
    
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it('calls onRemove with correct id when toast is closed', () => {
    const toasts = [
      { id: 'test-id', message: 'Test toast', type: 'info' as const },
    ];

    render(<ToastContainer toasts={toasts} onRemove={mockOnRemove} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith('test-id');
  });
});

