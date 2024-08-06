import { inject, injectable } from "inversify";

import { User } from "@/entities/user";
import { CreateUserDTO, UserRepository } from "../user-repository";
import { PasswordProvider } from "@/providers/password";
import { TYPES } from "@/application/http/container/constants";

@injectable()
export class InMemoryUserRepository implements UserRepository {
  public readonly users: User[] = [];

  constructor(
    @inject(TYPES.PasswordProvider)
    private readonly passwordProvider: PasswordProvider
  ) {}

  async find(): Promise<any[]> {
    return this.users.map((user) => user.details);
  }

  async findOne(username: string): Promise<any | undefined> {
    const user = this.users.find((user) => user.username === username);
    return user?.details;
  }

  async create(input: CreateUserDTO): Promise<void> {
    const existUser = await this.findOne(input.username);
    if (existUser) throw new Error("This username is already in use!");

    input.password = this.passwordProvider.encrypt(input.password);
    const user = User.create(input);
    this.users.push(user);
    return;
  }
}
