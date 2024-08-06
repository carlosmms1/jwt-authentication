import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authGuard = (req: Request, res: Response, nf: NextFunction) => {
  const { jwt: jwt_cookie } = req.cookies;

  if (!jwt_cookie) return res.sendStatus(403);

  jwt.verify(
    jwt_cookie,
    String(process.env.JWT_SECRET),
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(401);
      }

      // @ts-ignore
      req.user = {
        username: decoded.sub,
        name: decoded.name,
      };

      nf();
    }
  );
};
