import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/redux-hooks";
import HomePage from "./HomePage";
import { store } from "../../app/store";
import {
  toggleGameOver,
  incrementQuestionNr,
} from "../../features/quizSlice/quizSlice";

jest.mock("../../app/redux-hooks");

describe("HomePage component", () => {
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

  const mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => jest.fn());

  afterEach(() => {
    // Restore console.error to its original implementation
    mockConsoleError.mockRestore();
  });

  it("renders the home page with correct title", () => {
    mockUseAppSelector.mockReturnValue({
      gameOver: true,
      difficulty: "Any difficulty",
      category: { name: "Any category", code: "" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(getByText("QuizMaster")).toBeInTheDocument();
  });

  it("dispatches toggleGameOver, setQuestions, and incrementQuestionNr actions when Start button is clicked", async () => {
    mockUseAppSelector.mockReturnValue({
      gameOver: true,
      difficulty: "Any difficulty",
      category: { name: "Any category", code: "" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    fireEvent.click(getByText("Start"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(toggleGameOver());
      expect(dispatch).toHaveBeenCalledWith(incrementQuestionNr());
    });
  });
});
