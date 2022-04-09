import { Difficulty, isDifficulty, useDifficulty } from '../util/useDifficulty';
import CentralElement from '../components/CentralElement';
import generateBoard, { boardToString } from '../modules/generateBoard';

const Play = () => {
  const difficultyObj = useDifficulty();
  if (!difficultyObj.successful) {
    return displayErrorMessage(difficultyObj.errorMessage);
  }
  const difficulty = difficultyObj.difficulty;
  if (!isDifficulty(difficulty)) {
    return displayErrorMessage(
      'The difficulty you provided was not recognised',
    );
  }
  const board = generateBoard(difficultyToNumberOfDigits(difficulty));

  return <p>{boardToString(board)}</p>;
};

const difficultyToNumberOfDigits = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 8;
    case 'medium':
      return 5;
    case 'hard':
      return 2;
    default:
      return 0;
  }
};

export const displayErrorMessage = (message: string) => {
  return (
    <CentralElement className='bg-black'>
      <h1 className='text-warning' style={{ fontSize: '3vw' }}>
        {message}
      </h1>
    </CentralElement>
  );
};

export default Play;
