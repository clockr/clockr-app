import { SupporterType } from '@/types/SupporterType';

export type LoginResponseType = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  roles: string[];
  supporter: SupporterType;
  username: string;
};
