import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "~/server/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email address" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, request) => {
        try {
          const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password
            }),

          })
          if (res.status === 200) {
            const user = await res.json()
            return user
          }
        } catch (error) {
          return new Response(JSON.stringify({ error: "wrong credentials" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json"
            }
          })
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user = token
      return session
    }
  },
  pages: {
    signIn: "/",
  },
};


export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
