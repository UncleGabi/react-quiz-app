import { useSelector, useDispatch } from "react-redux";
import SelectBox from "../../components/SelectBox/SelectBox";
import { categories, difficulties } from "../../assets/SelectBoxData";
import {
  incrementQuestionNr,
  selectQuizData,
  setQuestions,
  toggleGameOver,
} from "../../features/quizSlice/quizSlice";
import "./HomePage.scss";

function HomePage() {
  const dispatch = useDispatch();
  const { gameOver, difficulty, category } = useSelector(selectQuizData);

  const diffQuery =
    difficulty.toLowerCase() !== "any difficulty"
      ? `&difficulty=${difficulty.toLowerCase()}`
      : "";

  const categoryQuery =
    category.name.toLowerCase() !== "any category"
      ? `&category=${category.code}`
      : "";

  const url = `https://opentdb.com/api.php?amount=10${diffQuery}${categoryQuery}`;

  async function fetchQuestions() {
    try {
      const questionData = await (await fetch(url)).json();
      dispatch(setQuestions(questionData.results));
    } catch (error) {
      console.error(error);
    }
  }

  function handleStart() {
    dispatch(toggleGameOver());

    if (gameOver) {
      fetchQuestions();
      dispatch(incrementQuestionNr());
    }
  }

  return (
    <div className="home-page">
      <h1>QuizMaster</h1>
      <div className="home-page__settings">
        <SelectBox
          type="difficulty"
          width={150}
          inputLabel="Difficulty"
          list={difficulties}
        />
        <SelectBox
          type="category"
          width={350}
          inputLabel="Category"
          list={categories}
        />
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}

export default HomePage;
