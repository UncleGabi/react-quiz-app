import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../features/quizSlice/quizSlice";
import timerSlice from "../features/timerSlice/timerSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
    timer: timerSlice,
  },
});
