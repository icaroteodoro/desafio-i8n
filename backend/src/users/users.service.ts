import { Injectable } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
    async createUser(user: iUser) {
        return prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    }

    async findUserByEmail(email:string) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        return user;
    }

}
