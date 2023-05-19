import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressbar from "../CircularProgressbar/CircularProgressbar";
import {
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
    const endTime = new Date().getTime() + (seconds[difficulty] || 90) * 1000;

    dispatch(setTimer(seconds[difficulty] || 90));

    interval.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(0, endTime - currentTime);
      const remainingSeconds = Math.ceil(remainingTime / 1000);

      if (remainingSeconds === 0) {
        clearInterval(interval.current);
      }

      dispatch(setTimer(remainingSeconds));
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
