import { User } from "@/entities/user";

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserRepository {
  find(): Promise<any[]>;
  findOne(username: string): Promise<any | undefined>;
  create(input: CreateUserDTO): Promise<void>;
}
