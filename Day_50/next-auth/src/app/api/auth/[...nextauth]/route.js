import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username:",
    //       type: "text",
    //       placeholder: "your-cool-username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "your-awesome-password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: "20", name: "Huy", password: "nextauth" };
    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
