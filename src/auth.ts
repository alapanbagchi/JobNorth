import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma";
import bcrypt from "bcryptjs";
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            avatar: string;
            designation: string;
        }
    }
}

export const authConfig = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (data) => {
                const user = await prisma.user.findUnique({
                    where: {
                        email: data.email as string
                    }
                })
                if (!user) return null
                const passwordMatched = bcrypt.compareSync(data.password as string, user.password)
                if (!passwordMatched) return null
                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.accessToken;
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.avatar = user.avatar
                token.designation = user.designation
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.avatar = token.avatar
            session.user.designation = token.designation
            return session

        },
        authorized(params) {
            return !!params.auth?.user;
        },
    },
} satisfies NextAuthConfig;

// Next can be any function with any amount of parameters 
export const authGuard = async (
    next: (...args: any[]) => Promise<ServerActionResponse>
): Promise<ServerActionResponse> => {
    const session = await auth();
    if (!session) {
        return {
            success: false,
            message: "Authentication failed: No session found",
            data: undefined,
        };
    }
    const user = session?.user.id;
    if (!user) {
        return {
            success: false,
            message: "Authentication failed: No user found",
            data: undefined,
        };
    }
    return next(user);
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig);
