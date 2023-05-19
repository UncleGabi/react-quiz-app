import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Quiz from "./Quiz";
import configureStore from "redux-mock-store";
import { Question } from "./Quiz.d";
import { Provider } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/redux-hooks";
import { testAppSelector } from "../../app/test-app-selector";

const mockStore = configureStore([]);
jest.mock("../../app/redux-hooks");

describe("Quiz component", () => {
  let store: ReturnType<typeof mockStore>;
  const dispatch = jest.fn;

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation(testAppSelector);
    (useAppDispatch as jest.Mock).mockImplementation(dispatch);
    store = mockStore({
      quiz: {
        userAnswer: "",
        answers: ["Paris", "London", "New York", "Tokyo"],
        questionNr: 1,
        score: 0,
      },
      timer: {
        timer: 60,
      },
    });
  });

  const questionData: Question = {
    category: "Geography",
    difficulty: "easy",
    type: "Multiple choice",
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "New York", "Tokyo"],
  };

  it("should render the question and answers", () => {
    const { getByText, container } = render(
      <Provider store={store}>
        <Quiz questionData={questionData} userAnswer="" />
      </Provider>
    );

    const question = container.querySelector(
      ".question-box__question"
    ) as HTMLDivElement;
    const answersDiv = container.querySelector(
      ".question-box__answers"
    ) as HTMLDivElement;

    expect(question).toBeTruthy();
    expect(getByText(questionData.correct_answer)).toBeTruthy();
    expect(getByText(questionData.incorrect_answers[0])).toBeTruthy();
    expect(getByText(questionData.incorrect_answers[1])).toBeTruthy();
    expect(getByText(questionData.incorrect_answers[2])).toBeTruthy();
    expect(answersDiv?.children.length).toBe(4);
  });

  it("should add class 'correct' when the correct answer is clicked", () => {
    const { container, rerender, getByText } = render(
      <Provider store={store}>
        <Quiz questionData={questionData} userAnswer="" />
      </Provider>
    );

    const correctAnswer = getByText(questionData.correct_answer);
    fireEvent.click(correctAnswer);

    rerender(
      <Provider store={store}>
        <Quiz
          questionData={questionData}
          userAnswer={questionData.correct_answer}
        />
      </Provider>
    );

    expect(correctAnswer.className).toContain("correct");
    expect(container.querySelector(".correct-icon")).toBeInTheDocument();
    expect(useAppDispatch).toHaveBeenCalled();
  });

  it("should add class 'incorrect' when the wrong answer is clicked", () => {
    const { container, getByText, rerender } = render(
      <Provider store={store}>
        <Quiz questionData={questionData} userAnswer="" />
      </Provider>
    );
    const incorrectAnswer = getByText("London");

    fireEvent.click(incorrectAnswer);

    rerender(
      <Provider store={store}>
        <Quiz
          questionData={questionData}
          userAnswer={questionData.incorrect_answers[0]}
        />
      </Provider>
    );

    expect(incorrectAnswer.className).toContain("incorrect");
    expect(container.querySelector(".incorrect-icon")).toBeInTheDocument();
    expect(useAppDispatch).toHaveBeenCalled();
  });
});
