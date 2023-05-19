import { useAppSelector } from "./app/redux-hooks";
import HomePage from "./Pages/HomePage/HomePage";
import QuizPage from "./Pages/QuizPage/QuizPage";
import { selectQuizData } from "./features/quizSlice/quizSlice";
import "./App.scss";

function App() {
  const { gameOver } = useAppSelector(selectQuizData);

  return <div className="quiz">{gameOver ? <HomePage /> : <QuizPage />}</div>;
}

export default App;
