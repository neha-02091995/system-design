// useDebounce.test.tsx
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DebounceComponent from './DebounceExample';

// A simple component to test the useDebounce hook

describe('useDebounce', () => {
  let callbackFn: jest.Mock;

  beforeEach(() => {
    callbackFn = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should call the callback function after the specified delay', () => {
    render(<DebounceComponent callbackFn={callbackFn} delay={1000} />);
    
    const input = screen.getByTestId('debounce-input');
    fireEvent.change(input, { target: { value: 'test' } });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith('test');
  });

  it('should not call the callback function if called again within the delay', () => {
    render(<DebounceComponent callbackFn={callbackFn} delay={1000} />);
    
    const input = screen.getByTestId('debounce-input');
    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.change(input, { target: { value: 'test2' } });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith('test2');
  });

  it('should reset the timer if called again within the delay', () => {
    render(<DebounceComponent callbackFn={callbackFn} delay={1000} />);
    
    const input = screen.getByTestId('debounce-input');
    fireEvent.change(input, { target: { value: 'test1' } });

    // Fast-forward time partially
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(input, { target: { value: 'test2' } });

    // Fast-forward time again
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callbackFn).not.toHaveBeenCalled();

    // Fast-forward time to complete the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith('test2');
  });
});
