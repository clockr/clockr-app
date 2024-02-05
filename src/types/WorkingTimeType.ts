export type WorkingTimeType = {
  id: number;
  startAt: Date | String;
  endAt?: Date | string;
  breakTime: number;
  note?: string;
  userId?: number;
};
