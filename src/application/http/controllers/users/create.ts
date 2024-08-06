import { controller, httpPost } from "inversify-express-utils";

import { CreateUserUseCase } from "@/use-cases/users/create";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../../container/constants";

@controller("/api/users")
export class CreateUserController {
  constructor(
    @inject(TYPES.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @httpPost("/")
  public async run(req: Request, res: Response) {
    const body = req.body;

    try {
      return res.status(201).json(await this.createUserUseCase.run(body));
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      return res.status(500).send("Internal server error.");
    }
  }
}
