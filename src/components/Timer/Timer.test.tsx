import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Timer from "./Timer";
import { store } from "../../app/store";
import { setTimer } from "../../features/timerSlice/timerSlice";

jest.mock("../../app/redux-hooks");

describe("Timer component", () => {
  let clearIntervalMock: jest.Mock;

  beforeEach(() => {
    clearIntervalMock = jest.fn();
    jest.spyOn(global, "clearInterval").mockImplementation(clearIntervalMock);
  });

  it("renders the timer with the correct initial value", () => {
    const { container } = render(
      <Provider store={store}>
        <Timer questionNr={1} userAnswer="" numOfQuestions={true} />
      </Provider>
    );

    const timer = container.querySelector(".circular-progressbar__main-title");
    expect(timer).toBeInTheDocument();
    expect(timer?.innerHTML).toBe("90");
  });

  it("clears the timer interval when userAnswer prop changes", () => {
    const { rerender } = render(
      <Provider store={store}>
        <Timer questionNr={1} userAnswer="" numOfQuestions={true} />
      </Provider>
    );

    expect(clearInterval).not.toHaveBeenCalled();

    rerender(
      <Provider store={store}>
        <Timer questionNr={1} userAnswer="some answer" numOfQuestions={true} />
      </Provider>
    );

    expect(clearInterval).toHaveBeenCalled();
  });

  it("dispatches the setTimer action when questionNr or numOfQuestions prop changes", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    const { rerender } = render(
      <Provider store={store}>
        <Timer questionNr={1} userAnswer="" numOfQuestions={true} />
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalledWith(setTimer(90));

    rerender(
      <Provider store={store}>
        <Timer questionNr={2} userAnswer="" numOfQuestions={true} />
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalledWith(setTimer(90));
  });
});
