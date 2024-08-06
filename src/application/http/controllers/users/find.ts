import { controller, httpGet } from "inversify-express-utils";

import { UserRepository } from "@/repository/user-repository";
import { FindUsersUseCase } from "@/use-cases/users/find";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../../container/constants";

@controller("/api/users")
export class FindUsersController {
  constructor(
    @inject(TYPES.FindUsersUseCase)
    private readonly findUsersUseCase: FindUsersUseCase
  ) {}

  @httpGet("/")
  public async run(req: Request, res: Response) {
    return res.json(await this.findUsersUseCase.run());
  }
}
