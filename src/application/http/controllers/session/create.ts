import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../../container/constants";
import { CreateSessionUseCase } from "@/use-cases/session/create";
import { Request, Response } from "express";

@controller("/api/session")
export class CreateSessionController {
  constructor(
    @inject(TYPES.CreateSessionUseCase)
    private readonly createSessionUseCase: CreateSessionUseCase
  ) {}

  @httpPost("/")
  public async run(req: Request, res: Response) {
    const body = req.body;

    try {
      const token = await this.createSessionUseCase.run(body);

      res.cookie("jwt", token, {
        sameSite: "strict",
        partitioned: true,
        httpOnly: true,
      });
      return res.sendStatus(201);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      return res.status(500).send("Internal server error.");
    }
  }
}
