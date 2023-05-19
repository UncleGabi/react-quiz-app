import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/redux-hooks";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  incrementScore,
  selectQuizData,
  setAnswers,
  setUserAnswer,
} from "../../features/quizSlice/quizSlice";
import { selectTimerData } from "../../features/timerSlice/timerSlice";

import "./Quiz.scss";

import { QuizProps } from "./Quiz.d";

function Quiz(props: QuizProps) {
  const { questionData, userAnswer } = props;
  const dispatch = useAppDispatch();
  const { questionNr, answers } = useAppSelector(selectQuizData);
  const { timer } = useAppSelector(selectTimerData);
  const { question, correct_answer, incorrect_answers } = questionData;

  useEffect(() => {
    document
      .querySelectorAll(".answer")
      .forEach((item) => (item.className = "answer"));
  }, [questionData]);

  useEffect(() => {
    dispatch(setAnswers([correct_answer, ...incorrect_answers]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNr]);

  useEffect(() => {
    if (userAnswer === correct_answer) {
      dispatch(incrementScore());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer]);

  const decodeHTMLEntities = (text: string) => {
    const entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x27", "'"],
      ["#x2F", "/"],
      ["#039", "'"],
      ["#047", "/"],
      ["deg", "°"],
      ["lt", "<"],
      ["gt", ">"],
      ["nbsp", " "],
      ["quot", '"'],
      ["ldquo", "“"],
      ["rdquo", "”"],
      ["rsquo", "'"],
      ["lsquo", "'"],
      ["ouml", "ö"],
      ["uuml", "ü"],
      ["aacute", "á"],
      ["eacute", "é"],
      ["iacute", "í"],
      ["Delta", "Δ"],
    ];

    for (let i = 0; i < entities.length; ++i)
      text = text.replace(
        new RegExp("&" + entities[i][0] + ";", "gi"),
        entities[i][1]
      );

    return text;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!userAnswer && timer !== 0) {
      const { innerHTML: selected } = e.currentTarget;
      const isCorrectSelected = selected === correct_answer;

      if (isCorrectSelected) {
        e.currentTarget.className += " correct";
      } else {
        e.currentTarget.className += " incorrect";
      }

      dispatch(setUserAnswer(selected));
    }
  };

  const isCorrectAnswer = (answerItem: string) =>
    (!!userAnswer || timer === 0) && answerItem === correct_answer;

  const isIncorrectAnswer = (answerItem: string) =>
    !!userAnswer && userAnswer !== correct_answer && userAnswer === answerItem;

  return (
    <div className="question-box">
      <div className="question-box__question">
        {decodeHTMLEntities(question)}
      </div>
      <div className="question-box__answers">
        {answers?.map((answer, i) => (
          <div
            key={i}
            onClick={handleClick}
            className={`answer${isCorrectAnswer(answer) ? " correct" : ""}`}
          >
            <>
              {decodeHTMLEntities(answer)}
              {isCorrectAnswer(answer) && (
                <CheckCircleOutlineRoundedIcon
                  className="correct-icon"
                  color="success"
                />
              )}
              {isIncorrectAnswer(answer) && (
                <HighlightOffIcon className="incorrect-icon" color="error" />
              )}
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
