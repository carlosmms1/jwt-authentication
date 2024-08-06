interface UserProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export class User {
  private _name: string;
  private _username: string;
  private _email: string;
  private _password: string;

  private constructor({ name, username, email, password }: UserProps) {
    this._name = name;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  public static create(props: UserProps) {
    return new User(props);
  }

  get details() {
    return {
      name: this._name,
      username: this._username,
      email: this._email,
      password: this._password,
    };
  }

  get name() {
    return this._name;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
