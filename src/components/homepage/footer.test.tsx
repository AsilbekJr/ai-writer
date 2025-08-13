import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  it('should have a right link to the privacy policy page ...', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const privacyPolicyLink = screen.getByTestId('@footer/privacy-policy');
    const href = privacyPolicyLink.getAttribute('href');
    expect(href).toBe('/privacy-policy');
  });
});
