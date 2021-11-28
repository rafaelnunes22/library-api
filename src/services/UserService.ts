import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcrypt"

class UserService {
  async authenticate(username: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new Error("User not registered!");
    };

    const authenticated = await compare(password, user.password);

    if (!authenticated) {
      throw new Error("Invalid password!");
    };

    const token = sign(
      {
        user: {
          username: user.username,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { user, token };
  }

  async generateUser() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "user",
      }
    });

    if (!!user) {
      return { user }
    }

    const passwordHash = await hash("password", 10);

    return await prismaClient.user.create({
      data: {
        avatar_url: "https://cdn-icons-png.flaticon.com/512/17/17004.png",
        username: "user",
        password: passwordHash
      }
    })
  }

}

export { UserService };
