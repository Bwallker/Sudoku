import { Difficulty, isDifficulty, useDifficulty } from '../util/useDifficulty';
import CentralElement from '../components/CentralElement';
import generateBoard from '../modules/generateBoard';
import Board from '../components/Board';
import ErrorMessage from '../util/ErrorMessage';

const Play = () => {
	const difficultyObj = useDifficulty();
	if (!difficultyObj.successful) {
		return <ErrorMessage>{difficultyObj.errorMessage}</ErrorMessage>;
	}
	const difficulty = difficultyObj.difficulty;
	if (!isDifficulty(difficulty)) {
		return (
			<ErrorMessage>
				The difficulty you provided was not recognised
			</ErrorMessage>
		);
	}
	const board = generateBoard(numberOfPrefilledDigits(difficulty));

	return <CentralElement>{<Board board={board} />}</CentralElement>;
};
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const numberOfPrefilledDigits = (difficulty: Difficulty) => {
	switch (difficulty) {
		case 'super_easy':
			return 78;
		case 'easy':
			return 70;
		case 'medium':
			return 55;
		case 'hard':
			return 30;
	}
};

export default Play;
