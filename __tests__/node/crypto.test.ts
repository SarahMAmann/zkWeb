import { get14DigitHashFromString } from '../../app/api/crypto';

describe('get14DigitHashFromString', () => {
  it('should generate a 14-digit hash from a string', () => {
    const inputString = 'test_string';
    const expectedHash = '00705858370846';
    const generatedHash = get14DigitHashFromString(inputString);

    expect(generatedHash).toBe(expectedHash);
  });

  it('should generate a 14-digit hash for an empty string', () => {
    const inputString = '';
    const expectedHash = '09176690719772';
    const generatedHash = get14DigitHashFromString(inputString);

    expect(generatedHash).toBe(expectedHash);
  });

});
