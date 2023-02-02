export interface RegisterUser {
  username: string;
  password: string;
  email: string;
  returnSecureToken: boolean;
}

export interface LoginUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface AuthResponse {
    idToken: string;
    expiresIn: string;
  }
export interface AccountAction {
  title: string;
  linkLabel: string;
  linkText: string;
}