import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school"

export const {auth, handlers: {GET, POST}, signIn, signOut} = NextAuth({
    secret : process.env.NEXT_AUTH_SECRET,
    
    //Providers
    providers : [
        FortyTwoProvider({
            clientId : process.env.AUTH_42_SCHOOL_ID,
            clientSecret: process.env.AUTH_42_SCHOOL_SECRET,
        })
    ],
    session : {
        strategy : "jwt",
        maxAge: 24 * 60 * 60,
    },
    jwt : {

    },
    //CallBacks
    callbacks : {
        async signIn({profile, user}:any)
        {
            if (!profile || !user) return false;
            if (profile.campus[0].id !== 21) //limit access to only BG campus.
                return false;
            return user;
        },
        async jwt({token, account, profile}:any)
        {
            if (profile)
            {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }
            return (token);
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
})