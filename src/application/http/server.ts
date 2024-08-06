import "reflect-metadata";
import dotenv from "@dotenvx/dotenvx";
dotenv.config();

import { app } from "./app";

async function bootstrap() {
  app.listen(8000, () => console.log("Server is running!"));
}

bootstrap();
