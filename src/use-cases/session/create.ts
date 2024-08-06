import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";

import { PasswordProvider } from "@/providers/password";
import { UserRepository } from "@/repository/user-repository";
import { TYPES } from "@/application/http/container/constants";

interface CreateSessionDTO {
  username: string;
  password: string;
}

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.PasswordProvider)
    private readonly passwordProvider: PasswordProvider
  ) {}

  async run({ username, password }: CreateSessionDTO) {
    const user = await this.userRepository.findOne(username);
    if (!user) throw new Error("Invalid credentials.");
    if (!this.passwordProvider.verify(password, user.password))
      throw new Error("Invalid credentials.");

    const token = jwt.sign(
      { name: user.name },
      String(process.env.JWT_SECRET),
      {
        subject: user.username,
        expiresIn: "30s",
      }
    );

    return token;
  }
}
