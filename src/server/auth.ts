import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { loginSchema } from "~/utils/validations/auth";
import { verify } from "argon2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
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
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email address" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        try {
          const creds = await loginSchema.parseAsync(credentials)
          const user = await prisma.user.findFirst({
            where: {
              email: creds.email
            }
          })

          if (!user) {
            return new Response(JSON.stringify({ msg: "User does not exist" }))
          }

          const isValidPassword = await verify(user.password, creds.password)
          if (!isValidPassword) return new Response(JSON.stringify({ msg: "Wrong passwords" }))

          return new Response(JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name
          }), { status: 201 }) as any

        } catch (error) {
          return new Response(JSON.stringify({ error: "wrong credentials" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json"
            }
          })
        }
      }
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
