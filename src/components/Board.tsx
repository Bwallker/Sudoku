import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { SudokuBoard } from '../modules/generateBoard';
import Cell from './Cell';
import classNames from 'classnames';
import BoardIndex from '../../generated/BoardIndex';
// @ts-ignore
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { NextRouter, useRouter } from 'next/router';

const createBoard = (
	state: State,
	setState: Dispatch<SetStateAction<State>>,
	router: NextRouter,
) => {
	let i = 0;
	const res: ReactNode[] = [];
	const boxes: ReactNode[] = [];
	for (let row = 0; row < 9; row += 3) {
		for (let col = 0; col < 9; col += 3) {
			const boxRows: ReactNode[][] = [];
			for (let boxRow = row; boxRow < row + 3; boxRow++) {
				const rowArr: ReactNode[] = [];
				for (let boxCol = col; boxCol < col + 3; boxCol++) {
					const index = (boxRow * 9 + boxCol) as BoardIndex;
					const v = state.board.cells[index]!.value;
					rowArr.push(
						<Cell
							className='d-inline-flex'
							key={i++}
							initialValue={v}
							state={state}
							setState={setState}
							index={index}
						/>,
					);
				}
				boxRows.push(rowArr);
			}
			const classForBoxRow = 'btn-group-vertical';
			const boxHtml = (
				<div className='p-5'>
					<div className={classNames(classForBoxRow)}>{boxRows[0]}</div>
					<div className={classNames(classForBoxRow)}>{boxRows[1]}</div>
					<div className={classNames(classForBoxRow)}>{boxRows[2]}</div>
				</div>
			);
			boxes.push(boxHtml);
		}
	}
	for (let j = 0; j < 3; j++) {
		res.push(<div>{boxes.slice(j * 3, j * 3 + 3)}</div>);
	}
	return (
		<div className='row row-cols-3'>
			{res}
			<Modal
				isOpen={state.board.isValid()}
				shouldFocusAfterRender={false}
				shouldReturnFocusAfterClose={true}
				shouldCloseOnEsc={true}
				className='text-center d-flex align-content-center justify-content-center p-0 m-0'
				style={{
					content: {
						width: 'auto',
						textAlign: 'center',
					},
					overlay: {
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
						display: 'inline-flex',
					},
				}}
			>
				<Button
					className='p-3'
					variant='dark'
					onClick={() => {
						router.push('/main-menu');
					}}
				>
					You solved the puzzle! Click me to return to main-menu
				</Button>
			</Modal>
		</div>
	);
};

interface Props {
	board: SudokuBoard;
}

export interface State {
	board: SudokuBoard;
}

const Board = (props: Props) => {
	const [state, setState] = useState<State>({
		board: props.board,
	});
	const boardHtml = createBoard(state, setState, useRouter());
	return boardHtml;
};

export default Board;
