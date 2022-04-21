import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { FilledSudokuDigit } from '../modules/generateBoard';
import { CSSProperties, useState } from 'react';

type CellContents = FilledSudokuDigit | undefined;
const vw = '2vw';

interface Props {
	initialValue: FilledSudokuDigit;
	className?: string;
	style?: CSSProperties;
}

const Cell = (props: Props) => {
	const [value, setValue] = useState<CellContents>(props.initialValue);

	return (
		<div
			style={{ ...props.style }}
			className={classNames(
				'p-1 m-0 border border-2 border-dark w-auto h-auto',
				props.className,
			)}
		>
			<Button
				style={{ width: vw, height: vw }}
				className='my-1 mx-0 p-0'
				variant='danger'
				onClick={() => {
					const newValue = computeNewValue(value);
					setValue(newValue);
				}}
			>
				{value}
			</Button>
		</div>
	);
};

const computeNewValue = (oldValue: CellContents): CellContents => {
	switch (oldValue) {
		case undefined:
			return 1;
		case 9:
			return undefined;
		default:
			return (oldValue + 1) as CellContents;
	}
};

export default Cell;
