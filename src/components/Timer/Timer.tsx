import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressbar from "../CircularProgressbar/CircularProgressbar";
import {
  decrementTimer,
  selectTimerData,
  setTimer,
} from "../../features/timerSlice/timerSlice";
import { selectQuizData } from "../../features/quizSlice/quizSlice";
import { seconds } from "../../features/Constants";

import { TimerProps } from "./Timer.d";

function Timer(props: TimerProps) {
  const { questionNr, userAnswer, numOfQuestions } = props;
  const dispatch = useDispatch();
  const { difficulty } = useSelector(selectQuizData);
  const { timer } = useSelector(selectTimerData);
  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    console.log("timer", timer);
  }, [timer]);

  useEffect(() => {
    if (numOfQuestions) {
      handleTimer();
    }

    return () => handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNr, numOfQuestions]);

  useEffect(() => {
    if (userAnswer) {
      clearInterval(interval.current);
    }
  }, [userAnswer]);

  const handleTimer = () => {
    dispatch(setTimer(seconds[difficulty] || 90));

    interval.current = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(interval.current);
    dispatch(setTimer(seconds[difficulty] || 90));
  };

  return (
    <div className="timer-wrapper">
      <CircularProgressbar
        mainTitle={`${timer}`}
        subtitle="seconds"
        percentage={timer / (seconds[difficulty] || 90)}
      />
    </div>
  );
}

export default Timer;
