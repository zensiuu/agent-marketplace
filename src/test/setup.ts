import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.fetch = vi.fn();

vi.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    isLoading: false,
  }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));
