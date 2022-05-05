import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { FilledSudokuDigit, SudokuDigit } from '../modules/generateBoard';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import BoardIndex from '../../generated/BoardIndex';
import { State } from './Board';

const emptyCellValue = undefined;
type CellContents = FilledSudokuDigit | typeof emptyCellValue;
const vw = '2vw';

interface Props {
	initialValue: SudokuDigit;
	className?: string;
	style?: CSSProperties;
	index: BoardIndex;
	state: State;
	setState: Dispatch<SetStateAction<State>>;
}

const Cell = (props: Props) => {
	const [value, setValue] = useState<CellContents>(
		props.initialValue === 0 ? emptyCellValue : props.initialValue,
	);
	const [initialValue, setInitialValue] = useState(props.initialValue);
	void setInitialValue;
	const isLocked = initialValue !== 0;
	return (
		<div
			style={{ ...props.style }}
			className={classNames('p-1', props.className)}
		>
			<Button
				style={{
					width: vw,
					height: vw,
				}}
				className='text-center d-flex align-items-center justify-content-center'
				variant={isLocked ? 'dark' : 'danger'}
				disabled={isLocked}
				onClick={() => {
					const newValue = computeNewValue(value);
					setValue(newValue);
					const newBoard = Object.create(props.state.board);
					newBoard.setIndex(
						props.index,
						newValue === emptyCellValue ? 0 : newValue,
					);
					props.setState({
						...props.state,
						board: newBoard,
					});
				}}
			>
				{value}
			</Button>
		</div>
	);
};

const computeNewValue = (oldValue: CellContents): CellContents => {
	switch (oldValue) {
		case emptyCellValue:
			return 1;
		case 9:
			return emptyCellValue;
		default:
			return (oldValue + 1) as CellContents;
	}
};

export default Cell;
