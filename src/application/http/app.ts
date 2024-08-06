import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ioc } from "./container/ioc";

const server = new InversifyExpressServer(ioc);

server.setConfig((app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
});

export const app = server.build();
