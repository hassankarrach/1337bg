import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    loginTime: number;
    user: {
      login: string;
      name: string;
      image: string;
      email: string;
      main_cursus: number;
      start_year : string;
      user_level : string;
    };
  }
}
