import { Container } from "inversify";

import { TYPES } from "./constants";
import { FindUsersUseCase } from "@/use-cases/users/find";
import { InMemoryUserRepository } from "@/repository/implementations/in-memory-user-repository";
import { UserRepository } from "@/repository/user-repository";
import { PasswordProvider } from "@/providers/password";
import { PasscryptProvider } from "@/providers/implementations/passcrypt";
import { CreateUserUseCase } from "@/use-cases/users/create";
import { CreateSessionUseCase } from "@/use-cases/session/create";

import "../controllers/session/create";
import "../controllers/session/delete";
import "../controllers/users/find";
import "../controllers/users/create";
import "../controllers/protected/route";

export const ioc = new Container();

ioc
  .bind<UserRepository>(TYPES.UserRepository)
  .to(InMemoryUserRepository)
  .inSingletonScope();
ioc
  .bind<CreateSessionUseCase>(TYPES.CreateSessionUseCase)
  .to(CreateSessionUseCase);
ioc.bind<PasswordProvider>(TYPES.PasswordProvider).to(PasscryptProvider);
ioc.bind<FindUsersUseCase>(TYPES.FindUsersUseCase).to(FindUsersUseCase);
ioc.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
