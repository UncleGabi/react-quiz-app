import { useDispatch, useSelector } from "react-redux";
import Timer from "../../components/Timer/Timer";
import Quiz from "../../components/Quiz/Quiz";
import Utils from "../../features/Utils";
import {
  incrementQuestionNr,
  resetQuestionNr,
  resetScore,
  selectQuizData,
  setQuestions,
  setUserAnswer,
  toggleGameOver,
} from "../../features/quizSlice/quizSlice";
import { selectTimerData } from "../../features/timerSlice/timerSlice";
import "./QuizPage.scss";
import { CircularProgress } from "@mui/material";

function QuizPage() {
  const dispatch = useDispatch();
  const { questions, questionNr, userAnswer, score, difficulty, category } =
    useSelector(selectQuizData);
  const { timer } = useSelector(selectTimerData);

  const handleClick = () => {
    if (questionNr < questions?.length - 1) {
      dispatch(incrementQuestionNr());
    } else {
      dispatch(toggleGameOver());
      dispatch(setQuestions([]));
      dispatch(resetQuestionNr());
      dispatch(resetScore());
    }
    dispatch(setUserAnswer(""));
  };

  return (
    <div className="quiz-container">
      <Timer
        questionNr={questionNr}
        userAnswer={userAnswer}
        numOfQuestions={!!questions.length}
      />
      {questions?.length ? (
        <>
          <div className="quiz-container__props">
            <h2>Difficulty: {Utils.capitalize(difficulty)}</h2>
            <h2>Category: {category.name}</h2>
          </div>
          <h2>
            Question: {questionNr + 1} / {questions?.length}
          </h2>
          <h3>
            Score: {score} / {questions?.length}
          </h3>
          <Quiz questionData={questions[questionNr]} userAnswer={userAnswer} />
          <div className="quiz-container__buttons">
            <button
              className="next"
              onClick={handleClick}
              disabled={!userAnswer && timer !== 0}
            >
              {questionNr === questions.length - 1 ? "Finish" : "Next"}
            </button>
            <button className="back" onClick={() => dispatch(toggleGameOver())}>
              Back
            </button>
          </div>
        </>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default QuizPage;
