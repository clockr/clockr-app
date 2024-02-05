import { Cookies } from 'react-cookie';

export const setAuthCookie = (token: string, expires_in: number) => {
  const cookies = new Cookies(null, { path: '/' });

  cookies.set('auth_token', token, {
    maxAge: expires_in,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

const getAuthCookie = (name: string) => {
  const cookies = new Cookies(null, { path: '/' });
  return cookies.get(name);
};

export const getValidAuthToken = () => {
  const token = getAuthCookie('auth_token');
  return {
    token: token,
  };
};

export const removeCookie = (cookie: string) => {
  const cookies = new Cookies(null, { path: '/' });
  cookies.remove(cookie);
};
