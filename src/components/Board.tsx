import { ReactNode, useState } from 'react';
import { SudokuBoard } from '../modules/generateBoard';
import Cell from './Cell';
import classNames from 'classnames';
import BoardIndex from '../../generated/BoardIndex';
// @ts-ignore
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import useWindowDimensions from '../util/useWindowDimensions';
import ErrorMessage from '../util/ErrorMessage';

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
	const router = useRouter();
	const dimensions = useWindowDimensions();
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
			let rowWidth;
			try {
				rowWidth = computeRowWidth(dimensions.width);
			} catch (e) {
				return <ErrorMessage>{e + ''}</ErrorMessage>;
			}
			const boxHtml = (
				<div className={classNames(rowWidth)}>
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
	console.log(dimensions.width);
	return (
		<div className='row row-cols-auto'>
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
					You solved the puzzle! Click me to return to the main-menu
				</Button>
			</Modal>
		</div>
	);
};

const computeRowWidth = (windowWidth: number): string => {
	if (windowWidth < 360) {
		throw 'Your screen is too small!';
	}
	if (windowWidth < 400) {
		return 'px-0 py-1';
	}
	if (windowWidth < 500) {
		return 'p-1';
	}
	if (windowWidth < 650) {
		return 'p-2';
	}
	return 'p-5';
};

export default Board;
