import { inject, injectable } from "inversify";

import { User } from "@/entities/user";
import { UserRepository } from "@/repository/user-repository";
import { TYPES } from "@/application/http/container/constants";

@injectable()
export class FindUsersUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  async run(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
