export type ContractType = {
  id: number;
  userId?: number;
  startAt: Date | string;
  endAt?: Date | string;
  hoursPerWeek: number;
  workingDays: string;
  vacationDaysPerYear: number;
};
