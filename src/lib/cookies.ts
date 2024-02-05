import { getCookie, deleteCookie, setCookie } from 'cookies-next';

export const setAuthCookie = (token: string, expires_in: number) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie('auth_token', toBase64, {
    maxAge: expires_in,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie, 'base64').toString('ascii');
};

export const getValidAuthToken = () => {
  const token = getAuthCookie('auth_token');

  return {
    token: token,
  };
};

export const removeCookie = (cookie: string) => {
  deleteCookie(cookie);
};
