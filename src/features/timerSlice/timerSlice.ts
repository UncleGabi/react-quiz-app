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
    decrementTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
});

export default timerSlice.reducer;
export const selectTimerData = (state: { timer: TimerStateType }) =>
  state.timer;
export const { setTimer, decrementTimer } = timerSlice.actions;
