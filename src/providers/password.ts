export interface PasswordProvider {
  encrypt(password: string): string;
  verify(input: string, password: string): boolean;
}
