import { describe, it, expect } from 'vitest';
import { isUnauthorizedError } from '../client/src/lib/authUtils';

describe('isUnauthorizedError', () => {
  it('should return true for 401 Unauthorized errors', () => {
    const error = new Error('401: Unauthorized');
    expect(isUnauthorizedError(error)).toBe(true);
  });

  it('should return true for 401 with additional message', () => {
    const error = new Error('401: User is Unauthorized to access this resource');
    expect(isUnauthorizedError(error)).toBe(true);
  });

  it('should return false for non-401 errors', () => {
    const error = new Error('500: Internal Server Error');
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('should return false for 400 errors', () => {
    const error = new Error('400: Bad Request');
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('should return false for 403 errors', () => {
    const error = new Error('403: Forbidden');
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('should return false for generic errors', () => {
    const error = new Error('Something went wrong');
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('should return false for empty error message', () => {
    const error = new Error('');
    expect(isUnauthorizedError(error)).toBe(false);
  });
});
