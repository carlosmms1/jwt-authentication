import { inject, injectable } from "inversify";

import { CreateUserDTO, UserRepository } from "@/repository/user-repository";
import { TYPES } from "@/application/http/container/constants";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  async run(input: CreateUserDTO): Promise<void> {
    await this.userRepository.create(input);
    return;
  }
}
