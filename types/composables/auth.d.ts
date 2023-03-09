export interface Authentication {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  isLogged(): boolean;
  _setToken(token: string): void;
  _removeToken (): void;
}
