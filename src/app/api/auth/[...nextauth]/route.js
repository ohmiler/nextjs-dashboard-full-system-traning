import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          // Use an empty object because we create a custom login 
          credentials: {},
          async authorize(credentials) {
                // const user = { id: '1' };
                // return user
                
                const { email, password } = credentials;

                try {

                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;

                } catch(error) {
                    console.log("Error: ", error)
                }
          }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, session }) {
            console.log("jwt callback", { token, user, session })


            // pass in user id and role to token
            if (user) {
                return {
                    ...token, 
                    id: user._id,
                    role: user.role
                }
            }

            return token
        },
        async session({ session, user, token }) {
            console.log("session callback", { session, user, token })

            // pass in user id and role to session
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }