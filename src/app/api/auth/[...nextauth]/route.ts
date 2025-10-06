import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prismaClient from "@/lib/prisma";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prismaClient.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user?.password == credentials.password) {
                    return {
                        id: user.id,
                        email: user.email,
                        name:user.name
                    };
                }
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user.id).toString();
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = parseInt(token.id);
                session.user.email = token.email as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }