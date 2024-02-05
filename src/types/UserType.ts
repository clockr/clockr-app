import { ContractType } from './ContractType';

export type UserType = {
  id: number;
  username: string;
  firstname?: string;
  lastname?: string;
  enabled?: boolean;
  contracts?: ContractType[];
};
