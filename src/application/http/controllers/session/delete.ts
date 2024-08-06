import { Request, Response } from "express";
import { controller, httpDelete } from "inversify-express-utils";

@controller("/api/session")
export class DeleteSessionController {
  @httpDelete("/")
  public async run(req: Request, res: Response) {
    res.clearCookie("jwt");
    res.end();
  }
}
