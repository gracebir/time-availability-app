import { signJwtAccessToken } from "~/server/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from "argon2";
import { prisma } from "~/server/db"

type requestBody = {
    email: string
    password: string
}

export default async function login(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { email, password }: requestBody = request.body
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user && await verify(user.password, password)) {
            const { password, ...userWithoutPass } = user
            const accessToken = signJwtAccessToken(userWithoutPass)
            const result = {
                accessToken,
                ...userWithoutPass
            }
        return response.json(result)
        } else return response.status(401).json({ msg: 'wrong credentials' })
    }
}