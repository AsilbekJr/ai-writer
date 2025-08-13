import { describe, it, expect } from 'vitest';

describe('something truthy or falsy', () => {
  it('it true to be true', () => {
    expect(true).toBe(true);
  });

  it('it false to be false', () => {
    expect(false).toBe(false);
  });
});
describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});
