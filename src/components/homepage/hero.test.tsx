import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Hero from './hero';
import * as authContext from '@/contexts/auth.context';
import { MemoryRouter } from 'react-router-dom';
import type { TRegisteredUser } from '@/shared/types/registered-user';

const renderHero = (user: TRegisteredUser | null) => {
  vi.spyOn(authContext, 'useAuthContext').mockReturnValue({
    user,
    logoutUser: vi.fn(),
    registerUser: vi.fn(),
    loginUser: vi.fn(),
  });
  render(
    <MemoryRouter>
      <authContext.AuthProvider>
        <Hero />
      </authContext.AuthProvider>
    </MemoryRouter>
  );
};

describe('Homepage Hero', () => {
  it('should render the register', () => {
    renderHero(null);
    const registerButton = screen.getByTestId('@hero/register-link');
    expect(registerButton).toBeInTheDocument();
  });
  it('should render the dashboard link if user is authenticated', () => {
    renderHero({
      login: 'login',
      password: 'password',
      createdAt: new Date(),
    });

    const dashboardLink = screen.getByTestId('@hero/dashboard-link');
    expect(dashboardLink).toBeInTheDocument();
  });
});
