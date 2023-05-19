import { store } from "../../app/store";
import { setTimer } from "./timerSlice";

jest.mock("../../app/redux-hooks");

describe("timerSlice", () => {
  beforeEach(() => {
    store.dispatch(setTimer(90));
  });

  it("should set timer", () => {
    expect(store.getState().timer.timer).toBe(90);
    store.dispatch(setTimer(60));
    expect(store.getState().timer.timer).toBe(60);
  });
});
