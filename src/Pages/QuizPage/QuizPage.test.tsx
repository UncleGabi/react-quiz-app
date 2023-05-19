import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import QuizPage from "./QuizPage";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/redux-hooks";
import {
  incrementQuestionNr,
  resetQuestionNr,
  resetScore,
  setQuestions,
  setUserAnswer,
  toggleGameOver,
} from "../../features/quizSlice/quizSlice";

jest.mock("../../app/redux-hooks");

describe("QuizPage component", () => {
  const dispatch = jest.fn();
  const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
    typeof useAppDispatch
  >;
  const mockUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  beforeEach(() => {
    dispatch.mockClear();
    mockUseAppDispatch.mockReturnValue(dispatch);
  });

  it("should render Timer, Quiz, Loader and CircularProgress components", () => {
    mockUseAppSelector.mockReturnValue({
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
    });

    const { container, getByText } = render(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );

    const nextBtn = getByText("Next");

    const timerComp = container.querySelector(".timer-wrapper");
    const circularProgComp = container.querySelector(".circular-progressbar");
    const quizComp = container.querySelector(".question-box");

    expect(nextBtn).toBeDisabled();
    expect(timerComp).toBeInTheDocument();
    expect(circularProgComp).toBeInTheDocument();
    expect(quizComp).toBeInTheDocument();
  });

  it("should render Loader component when there are no questions", () => {
    mockUseAppSelector.mockReturnValue({
      questions: [],
      questionNr: 0,
      userAnswer: "",
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { container } = render(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );

    const loaderComp = container.querySelector(".loader");
    expect(loaderComp).toBeInTheDocument();
  });

  it("should go to the next Question when Next is clicked", async () => {
    mockUseAppSelector.mockReturnValue({
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
      userAnswer: "London",
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );

    const nextBtn = getByText("Next");

    fireEvent.click(nextBtn);

    expect(nextBtn).not.toBeDisabled();
    expect(dispatch).toHaveBeenCalledWith(incrementQuestionNr());
    expect(dispatch).toHaveBeenCalledWith(setUserAnswer(""));
  });

  it("should call multiple functions when the quiz is over", () => {
    mockUseAppSelector.mockReturnValue({
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
      questionNr: 1,
      userAnswer: "London",
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );

    const finishBtn = getByText("Finish");

    fireEvent.click(finishBtn);

    expect(dispatch).toHaveBeenCalledWith(toggleGameOver());
    expect(dispatch).toHaveBeenCalledWith(setQuestions([]));
    expect(dispatch).toHaveBeenCalledWith(resetQuestionNr());
    expect(dispatch).toHaveBeenCalledWith(resetScore());
  });

  it("should call toggleGameOver() when back button is clicked", () => {
    mockUseAppSelector.mockReturnValue({
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
      questionNr: 1,
      userAnswer: "London",
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );

    const backBtn = getByText("Back");

    fireEvent.click(backBtn);

    expect(dispatch).toHaveBeenCalledWith(toggleGameOver());
  });
});
