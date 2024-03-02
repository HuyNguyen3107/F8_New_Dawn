// export type Provider = 'google' | 'github';
// export const providers: Provider[] = ['google', 'github'];

export const SERVER_URL = "https://backend-theta-plum.vercel.app";

export const redirectLinks = {
  google: "/api/auth/google",
  github: "/api/auth/github",
};

export const accessLinks = {
  google: "/api/auth/google/callback",
  github: "/api/auth/github/callback",
};
