import jwt from "jsonwebtoken";

const ACCESS_SECRET  = process.env.JWT_SECRET        || "drive_access_secret_change_in_prod";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "drive_refresh_secret_change_in_prod";

export interface TokenPayload {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}
