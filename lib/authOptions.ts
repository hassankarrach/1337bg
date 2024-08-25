import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import type { NextAuthOptions } from "next-auth";
import { db } from "../lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    FortyTwoProvider({
      clientId: process.env.AUTH_42_SCHOOL_ID as string,
      clientSecret: process.env.AUTH_42_SCHOOL_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async signIn({ profile, user }: any) {
      if (!profile || !user) return false;
      if (profile.campus[0].id !== 21 && profile.campus[0].id !== 75)
        return false; // limit access to only BG campus (RB tmp)
      return true;
    },
    async jwt({ token, account, profile }: any) {
      if (profile) {
        console.log(profile);
        token.accessToken = account?.access_token;
        token.id = profile.id;
        token.login = profile.login;
        token.image = profile.image.versions.small;
        token.main_cursus =
          profile.cursus_users[profile.cursus_users.length - 1].cursus_id;
        token.start_date =
          profile.cursus_users[profile.cursus_users.length - 1].begin_at;
        token.pool_year = profile.pool_year;
        token.pool_month = profile.pool_month;
        token.campus_id = profile.campus[0].id;
        token.user_level =
          profile.cursus_users[profile.cursus_users.length - 1].level;
        if (!token.loginTime) {
          token.loginTime = Date.now();
        }
        const dbUser = await db.user.findUnique({
          where: { user_name: profile.login },
        });
        if (dbUser) {
          token.verified = true;
          token.banner_url = dbUser.banner_url;
          token.nickname = dbUser.nickname;
        } else {
          token.verified = false;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.loginTime = token.loginTime;
      session.user.login = token.login;
      session.user.image = token.image;
      session.user.main_cursus = token.main_cursus;
      session.user.campus_id = token.campus_id;
      session.user.start_year = token.start_date;
      session.user.pool_year = Number(token.pool_year);
      session.user.pool_month =
        new Date(`${token.pool_month.toLowerCase()} 1, 2020`).getMonth() + 1;
      session.user.user_level = token.user_level;
      session.user.verified = token.verified;
      session.user.banner_url = token.banner_url;
      session.user.nickname = token.nickname;
      return session;
    },
  },
};

export default NextAuth(authOptions);
