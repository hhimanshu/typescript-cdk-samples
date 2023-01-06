import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            post: true
        }
    })
    console.dir(users, {depth: null})
    return users
}
