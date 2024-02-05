export type LoginResponseType = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  roles: string[];
  username: string;
  id: number;
};
