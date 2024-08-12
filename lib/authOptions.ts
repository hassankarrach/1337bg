import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,

  //Providers
  providers: [
    FortyTwoProvider({
      clientId: process.env.AUTH_42_SCHOOL_ID,
      clientSecret: process.env.AUTH_42_SCHOOL_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //as 42 does :(
  },
  jwt: {},
  //CallBacks
  callbacks: {
    async signIn({ profile, user }: any) {
      if (!profile || !user) return false;
      if (profile.campus[0].id !== 21)
        //limit access to only BG campus.
        return false;
      return user;
    },
    async jwt({ token, account, profile }: any) {
      if (profile) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.login = profile.login;
        token.main_cursus =
          profile.cursus_users[profile.cursus_users.length - 1].cursus_id;
        token.start_year =
          profile.cursus_users[profile.cursus_users.length - 1].begin_at;
        token.user_level =
          profile.cursus_users[profile.cursus_users.length - 1].level;
        if (!token.loginTime) {
          token.loginTime = Date.now(); // Store the original login time
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.loginTime = token.loginTime;
      session.user.login = token.login;
      session.user.main_cursus = token.main_cursus;
      session.user.start_year = token.start_year;
      session.user.user_level = token.user_level;
      return session;
    },
  },
});
