import * as matchers from '@testing-library/jest-dom/matchers';
import { afterEach, beforeEach, expect, vi } from 'vitest';

declare module 'vitest' {
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      matchers.TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);
