export type ManualEntryType = {
  id: number;
  date: Date | string;
  type: string;
  amount: number;
  note?: string;
  userId?: number;
};
