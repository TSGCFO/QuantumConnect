import { describe, it, expect } from 'vitest';
import { cn } from '../client/src/lib/utils';

describe('cn utility function', () => {
  it('should merge class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('should filter out falsy values', () => {
    const result = cn('base', false && 'hidden', undefined, null, 'end');
    expect(result).toBe('base end');
  });

  it('should merge Tailwind classes properly', () => {
    // tailwind-merge should handle conflicting classes
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('should handle arrays of class names', () => {
    const result = cn(['foo', 'bar']);
    expect(result).toBe('foo bar');
  });

  it('should handle object notation', () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe('foo baz');
  });

  it('should return empty string for empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });
});
