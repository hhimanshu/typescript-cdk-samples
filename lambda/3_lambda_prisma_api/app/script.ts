import { PrismaClient } from '@prisma/client'
import {getAllUsers} from "./src/functions/users/read";
import {createUser} from "./src/functions/users/create";

const prisma = new PrismaClient()

async function main() {
    /*const insertUser = async () => {
        const user = await prisma.user.create({
            data: {
                email: 'lisa@email.com',
                name: 'Lisa B',
            },
        })
        console.log(user)
    }*/

    /*const getAllUsers = async () => {
        const users = await prisma.user.findMany({
            include: {
                post: true
            }
        })
        console.dir(users, {depth: null})
    }*/

    /*const createUserWithPosts = async () => {
        const user = await prisma.user.create({
            data: {
                name: 'Johnny D',
                email: 'johnny@email.com',
                post: {
                    create: {
                        title: 'First Post',
                        content: 'This is my first post'
                    }
                }
            }
        })
        console.log(user)
    }*/

    // await insertUser()
    // await getAllUsers()
    // await createUserWithPosts()
    // await createUser("Amy B", "amy@email.com")
    // await getAllUsers();
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })