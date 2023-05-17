import { Question } from "../../components/Quiz/Quiz.d";

export type QuizStateType = {
  questions: Question[];
  answers: string[];
  questionNr: number;
  userAnswer: string;
  score: number;
  gameOver: boolean;
  difficulty: string;
  category: Category;
};

type Category = {
  name: string;
  code: string;
};
