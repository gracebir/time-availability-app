
import { hash } from "argon2";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { signUpSchema } from "~/utils/validations/auth";

export const userRouter = createTRPCRouter({
    register: publicProcedure
        .input(signUpSchema)
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input
            const hashPassword = await hash(password)

            const exists = await ctx.prisma.user.findUnique({
                where: { email }
            })

            if (exists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists."
                })
            }

            const user = await ctx.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            })

            return new Response(JSON.stringify({
                status: 201,
                message: "Account created successfully",
                result: user.email
            }))
        })
});