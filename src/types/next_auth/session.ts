import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    loginTime: number;
    user: {
      id : number;
      login: string;
      name: string;
      image: string;
      email: string;
      main_cursus: number;
      campus_id : number;
      start_year : string;
      pool_year : number;
      pool_month : number;
      user_level : string;
      verified: boolean;
      banner_url: string;
      nickname: string;
    };
  }
}
