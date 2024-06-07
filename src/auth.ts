import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school"

export const {auth, handlers: {GET, POST}, signIn, signOut} = NextAuth({
    providers : [
        FortyTwoProvider({
            clientId : process.env.AUTH_42_SCHOOL_ID,
            clientSecret: process.env.AUTH_42_SCHOOL_SECRET,
            profile(profile){
                console.log(profile);
                return {
                    ...profile
                }
            }
        })
    ],
    secret : process.env.NEXT_AUTH_SECRET
})