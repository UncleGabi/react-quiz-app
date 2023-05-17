import { createSlice } from "@reduxjs/toolkit";
import { QuizStateType } from "../quizSlice/quizSlice.d";
import { categories } from "../../assets/SelectBoxData";

const initialState: QuizStateType = {
  questions: [],
  answers: [],
  questionNr: -1,
  userAnswer: "",
  score: 0,
  gameOver: true,
  difficulty: "Any difficulty",
  category: { name: "Any category", code: "" },
};

const cakeSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = [...action.payload];
    },
    setAnswers: (state, action) => {
      const answers = [...action.payload].sort(() => Math.random() - 0.5);
      state.answers = answers;
    },
    resetQuestionNr: (state) => {
      state.questionNr = -1;
    },
    incrementQuestionNr: (state) => {
      state.questionNr += 1;
    },
    setUserAnswer: (state, action) => {
      state.userAnswer = action.payload;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    toggleGameOver: (state) => {
      state.gameOver = !state.gameOver;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setCategory: (state, action) => {
      const category = action.payload;
      const code = `${categories.indexOf(category) + 8}`;

      if (category.toLowerCase() === "any category") {
        state.category = { name: category, code: "" };
      } else {
        state.category = { name: category, code };
      }
    },
  },
});

export default cakeSlice.reducer;
export const selectQuizData = (state: { quiz: QuizStateType }) => state.quiz;
export const {
  setQuestions,
  setAnswers,
  resetQuestionNr,
  incrementQuestionNr,
  setUserAnswer,
  resetScore,
  incrementScore,
  toggleGameOver,
  setDifficulty,
  setCategory,
} = cakeSlice.actions;
