import { controller, httpGet } from "inversify-express-utils";
import { authGuard } from "../../middlewares/auth-guard";
import { Request, Response } from "express";

@controller("/api/protected")
export class ProtectedRouteController {
  @httpGet("", authGuard)
  public async get(req: Request, res: Response) {
    // @ts-ignore
    return res.json({ message: "u're authorized.", user: req.user });
  }
}
