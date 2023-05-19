import { store } from "../../app/store";
import { decrementTimer, setTimer } from "./timerSlice";

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

  it("should decrement timer if timer is greater than 0", () => {
    expect(store.getState().timer.timer).toBe(90);
    store.dispatch(decrementTimer());
    expect(store.getState().timer.timer).toBe(89);
  });

  it("should not decrement timer if timer is already 0", () => {
    store.dispatch(setTimer(0));
    expect(store.getState().timer.timer).toBe(0);

    store.dispatch(decrementTimer());
    expect(store.getState().timer.timer).toBe(0);
  });
});
