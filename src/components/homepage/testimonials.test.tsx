import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // MUHIM
import Testimonials from './testimonials';
import { render, screen } from '@testing-library/react';

describe('Testimonials', () => {
  it('should render the testimonials photo', () => {
    render(<Testimonials />);
    expect(screen.getByTestId('@testimonials/photo')).toBeInTheDocument();
  });
});
