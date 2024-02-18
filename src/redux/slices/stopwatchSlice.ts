import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkingTimeType } from '../../types/WorkingTimeType';

const initialState = {
  workingTimeItem: null,
};

const slice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    setWorkingTimeItem: (state, action: PayloadAction<WorkingTimeType>) => {
      state.workingTimeItem = action.payload;
    },
  },
});

export const { setWorkingTimeItem } = slice.actions;
export const stopwatchReducer = slice.reducer;
