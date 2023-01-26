export interface RegisterUser {
  username: string;
  password: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AccountAction {
  title: string;
  linkLabel: string;
  linkText: string;
}
