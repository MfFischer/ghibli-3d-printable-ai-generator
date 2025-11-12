import { renderHook, act } from '@testing-library/react';
import { useToast } from '../../hooks/useToast';

describe('useToast Hook', () => {
  it('initializes with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast with addToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('Test message', 'info');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('info');
    expect(result.current.toasts[0].id).toBeDefined();
  });

  it('adds success toast with success method', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success('Success message');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[0].message).toBe('Success message');
  });

  it('adds error toast with error method', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.error('Error message');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('error');
    expect(result.current.toasts[0].message).toBe('Error message');
  });

  it('adds info toast with info method', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.info('Info message');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('info');
  });

  it('adds warning toast with warning method', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.warning('Warning message');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('warning');
  });

  it('removes toast by id', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test', 'info');
    });

    expect(result.current.toasts).toHaveLength(1);
    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('adds multiple toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success('First');
      result.current.error('Second');
      result.current.info('Third');
    });
    
    expect(result.current.toasts).toHaveLength(3);
    expect(result.current.toasts[0].message).toBe('First');
    expect(result.current.toasts[1].message).toBe('Second');
    expect(result.current.toasts[2].message).toBe('Third');
  });

  it('generates unique ids for each toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('First', 'info');
      result.current.addToast('Second', 'info');
    });
    
    const ids = result.current.toasts.map((t) => t.id);
    expect(new Set(ids).size).toBe(2); // All unique
  });

  it('removes only the specified toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('First', 'info');
      result.current.addToast('Second', 'info');
    });

    const firstId = result.current.toasts[0].id;
    const secondId = result.current.toasts[1].id;

    act(() => {
      result.current.removeToast(firstId);
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe(secondId);
  });
});

