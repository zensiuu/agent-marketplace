import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    redirect_uri: 'http://localhost:3000/auth/callback',
  },
});

export const GET = auth0.middleware;
