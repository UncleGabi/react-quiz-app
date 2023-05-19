export const mockAppState = {
  quiz: {
    userAnswer: "",
    answers: ["Paris", "London", "New York", "Tokyo"],
    questionNr: 1,
    score: 0,
  },
  timer: {
    timer: 90,
  },
};

export const testAppSelector = (f: any) => f(mockAppState);
