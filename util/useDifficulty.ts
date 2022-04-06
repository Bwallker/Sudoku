import { useRouter } from 'next/router';

export interface OkDifficulty {
  successful: true;
  difficulty: string;
}

export interface ErrorDifficulty {
  successful: false;
  errorMessage: string;
}

const difficultyArr = ['easy', 'medium', 'hard'] as const;
export type Difficulty = typeof difficultyArr[number];
export const isDifficulty = (x: unknown): x is Difficulty =>
  difficultyArr.findIndex((y) => x === y) !== -1;
export type DifficultyResult = OkDifficulty | ErrorDifficulty;

export const useDifficulty = (): DifficultyResult => {
  const { query } = useRouter();
  const difficulty = query['difficulty'];
  if (difficulty === undefined) {
    return err('Difficulty must be defined');
  }

  if (Array.isArray(difficulty)) {
    return err('Difficulty should only be specified once');
  }
  return ok(difficulty);
};

const err = (message: string): ErrorDifficulty => {
  return {
    successful: false,
    errorMessage: message,
  };
};

const ok = (difficulty: string): OkDifficulty => {
  return {
    successful: true,
    difficulty,
  };
};
