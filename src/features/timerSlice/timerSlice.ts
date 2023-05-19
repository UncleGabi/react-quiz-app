import { createSlice } from "@reduxjs/toolkit";
import { TimerStateType } from "./timerSlice.d";

const initialState: TimerStateType = {
  timer: 90,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
  },
});

export default timerSlice.reducer;
export const selectTimerData = (state: { timer: TimerStateType }) =>
  state.timer;
export const { setTimer } = timerSlice.actions;
