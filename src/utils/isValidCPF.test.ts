import { expect, test } from 'vitest'
import isValidCPF from './isValidCPF';

test('isValidCPF', () => {
  expect(isValidCPF('69882628818')).toBe(true);
  expect(isValidCPF('23003232032')).toBe(false);
})
