import { ReactNode } from 'react';
import {
	FilledSudokuDigit,
	SudokuBoard,
	SudokuDigit,
} from '../modules/generateBoard';
import Cell from './Cell';
import CentralElement from './CentralElement';

const createBoard = (board: SudokuDigit[]) => {
	let i = 0;
	const res: ReactNode[] = [];
	for (let row = 0; row < 9; row += 3) {
		for (let col = 0; col < 9; col += 3) {
			const box: ReactNode[] = [];
			for (let boxRow = row; boxRow < row + 3; boxRow++) {
				for (let boxCol = col; boxCol < col + 3; boxCol++) {
					const index = boxRow * 9 + boxCol;
					const v = board[index]! as FilledSudokuDigit;
					box.push(
						<Cell
							className='p-0 m-0 text-center d-inline-flex align-items-center justify-content-center'
							key={i++}
							initialValue={v}
						/>,
					);
				}
			}
			res.push(
				<div className='px-0 py-0 m-0 row row-cols-3 border border-2 border-danger w-auto h-auto'>
					{box}
				</div>,
			);
		}
	}
	return (
		<CentralElement className='p-0 m-0 row row-cols-3'>
			<div className='p-0 m-0 row row-cols-3'>{res}</div>
		</CentralElement>
	);
};

interface Props {
	board: SudokuBoard;
}

const Board = (props: Props) => {
	const actualBoard = props.board.cells.map((v) => v.value);
	return createBoard(actualBoard);
};

export default Board;
