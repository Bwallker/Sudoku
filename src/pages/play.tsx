import { Difficulty, isDifficulty, useDifficulty } from '../util/useDifficulty';
import CentralElement from '../components/CentralElement';
import generateBoard from '../modules/generateBoard';
import Board from '../components/Board';

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
	const board = generateBoard();

	return <CentralElement>{<Board board={board} />}</CentralElement>;
};
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const displayErrorMessage = (message: string) => (
	<CentralElement className='bg-black'>
		<h1 className='text-warning' style={{ fontSize: '3vw' }}>
			{message}
		</h1>
	</CentralElement>
);

export default Play;
