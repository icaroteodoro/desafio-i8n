import { parseCookies, setCookie, destroyCookie } from "nookies";
import jwt from "jsonwebtoken";


export function getToken(ctx = null) {
  return parseCookies(ctx).token;
}

export function getEmailFromToken(ctx?: any) {
  const token = getToken();

    if (!token) {
        return;
    }

    const email = jwt.decode(token)?.sub;
    return email;
}

export function saveToken(token: string, ctx = null) {
  setCookie(ctx, "token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
}

export function getRefreshToken(ctx = null) {
  return parseCookies(ctx).refreshToken;
}

export function saveRefreshToken(refreshToken: string, ctx = null) {
  setCookie(ctx, "refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}


export function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    const decoded: any = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}