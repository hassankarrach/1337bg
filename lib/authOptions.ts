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

    //CallBacks
    callbacks : {
        async signIn({profile, user})
        {
            if (!profile || !user) return false;
            //Limit Access later to ONLY (BG - KH - MED) campuses;
            return user;
        },
        async jwt({token, account, profile})
        {
            if (profile)
            {
                token.accessToken = account?.access_token;
                token.id = profile.id;
            }
            return (token);
        }
    }
})