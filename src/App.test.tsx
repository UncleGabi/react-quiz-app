import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { useAppSelector, useAppDispatch } from "./app/redux-hooks";

jest.mock("./app/redux-hooks");

describe("App component", () => {
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

  it("should render HomePage when gameOver is true", () => {
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
      gameOver: true,
      userAnswer: "",
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("QuizMaster")).toBeInTheDocument();
  });

  it("should render QuizPage when gameOver is false", () => {
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
      gameOver: false,
      score: 0,
      difficulty: "easy",
      category: { name: "Geography", code: "15" },
    });

    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container.querySelector(".quiz")).toBeInTheDocument();
    expect(container.querySelector(".quiz-container")).toBeInTheDocument();
  });
});
