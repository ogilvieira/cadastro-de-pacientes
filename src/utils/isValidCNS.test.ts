import { expect, test } from 'vitest'
import isValidCNS from './isValidCNS';

test('isValidCNS [0,3,4,5,6]', () => {
  // começando com 0,3,4,5,6
  expect(isValidCNS('012379274720006')).toBe(false);
});

test('isValidCNS [1,2]', () => {
  // começando com 0,1,2
  expect(isValidCNS('274924284294924')).toBe(false);
  expect(isValidCNS('112379274720006')).toBe(true);
  expect(isValidCNS('139871753760008')).toBe(true);
  expect(isValidCNS('107708764020018')).toBe(true);
  expect(isValidCNS('227107189360003')).toBe(true);
  expect(isValidCNS('282868022890006')).toBe(true)
});

test('isValidCNS [7,8,9]', () => {
  // começando com 7,8,9
  expect(isValidCNS('803839322990005')).toBe(true);
  expect(isValidCNS('898174067340002')).toBe(true); 
  expect(isValidCNS('703291230590002')).toBe(true);
  expect(isValidCNS('799302207100007')).toBe(true);
  expect(isValidCNS('803849322390005')).toBe(false);
  expect(isValidCNS('703261230590003')).toBe(false);
})
