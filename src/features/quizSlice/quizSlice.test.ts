import {
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
} from "./quizSlice";
import { store } from "../../app/store";

describe("quizSlice", () => {
  const testState = {
    questions: [
      {
        category: "Geography",
        difficulty: "easy",
        type: "Multiple choice",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "New York", "Tokyo"],
      },
      {
        category: "Geography",
        difficulty: "easy",
        type: "Multiple choice",
        question: "What is the capital of the UK?",
        correct_answer: "London",
        incorrect_answers: ["Paris", "New York", "Tokyo"],
      },
    ],
    questionNr: 0,
    userAnswer: "",
    score: 0,
    difficulty: "easy",
    category: { name: "Geography", code: "15" },
  };

  it("should set questions", () => {
    const questions1 = store.getState().quiz.questions;
    expect(questions1).toStrictEqual([]);

    store.dispatch(setQuestions(testState.questions));

    const questions2 = store.getState().quiz.questions;
    expect(questions2).toStrictEqual(testState.questions);
  });

  it("should set answers", () => {
    const { correct_answer, incorrect_answers } = testState.questions[0];
    store.dispatch(setAnswers([correct_answer, ...incorrect_answers]));
    const shuffledAnswers = store.getState().quiz.answers;

    expect(store.getState().quiz.answers).toStrictEqual(shuffledAnswers);
  });

  it("should increment and reset question number", () => {
    store.dispatch(incrementQuestionNr());
    store.dispatch(incrementQuestionNr());
    store.dispatch(incrementQuestionNr());

    expect(store.getState().quiz.questionNr).toBe(2);

    store.dispatch(resetQuestionNr());

    expect(store.getState().quiz.questionNr).toBe(-1);
  });

  it("should set userAnswer", () => {
    expect(store.getState().quiz.userAnswer).toBe("");
    store.dispatch(setUserAnswer("Answer"));
    expect(store.getState().quiz.userAnswer).toBe("Answer");
  });

  it("should increment reset score", () => {
    expect(store.getState().quiz.score).toBe(0);
    store.dispatch(incrementScore());
    expect(store.getState().quiz.score).toBe(1);
    store.dispatch(resetScore());
    expect(store.getState().quiz.score).toBe(0);
  });

  it("should toggle game over", () => {
    expect(store.getState().quiz.gameOver).toBe(true);
    store.dispatch(toggleGameOver());
    expect(store.getState().quiz.gameOver).toBe(false);
  });

  it("should set difficulty", () => {
    expect(store.getState().quiz.difficulty).toBe("Any difficulty");
    store.dispatch(setDifficulty("Hard"));
    expect(store.getState().quiz.difficulty).toBe("Hard");
  });

  it("should set category", () => {
    expect(store.getState().quiz.category).toStrictEqual({
      name: "Any category",
      code: "",
    });

    store.dispatch(setCategory("General Knowledge"));

    expect(store.getState().quiz.category).toStrictEqual({
      name: "General Knowledge",
      code: "7",
    });

    store.dispatch(setCategory("Any category"));

    expect(store.getState().quiz.category).toStrictEqual({
      name: "Any category",
      code: "",
    });
  });
});
