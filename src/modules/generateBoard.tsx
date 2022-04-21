import {
	difference as _difference,
	shuffle,
	sortedUniq as _sortedUniq,
	sortedUniqBy as _sortedUniqBy,
	times as _times,
} from 'lodash';

const total = 81;
const size = 9;
const third = 3;
const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type SudokuDigit = typeof validValues[number] | 0;
export type FilledSudokuDigit = Exclude<SudokuDigit, 0>;
export type RowOrColIndex = Exclude<SudokuDigit, 9>;

interface Coordinate {
	row: RowOrColIndex;
	col: RowOrColIndex;
}

class SudokuCell {
	value: SudokuDigit = 0;
	position: Coordinate;
	neighbors: Array<Coordinate> = [];

	constructor(position: Coordinate) {
		this.position = position;
		this.value = 0;

		// identify block top left
		const rowBase = Math.floor(position.row / third) * third;
		const colBase = Math.floor(position.col / third) * third;

		const blockNeighbors: Coordinate[] = [];
		_times(size, (index: number) => {
			const row = (Math.floor(index / third) + rowBase) as RowOrColIndex;
			const col = ((index % third) + colBase) as RowOrColIndex;

			if (row !== position.row || col !== position.col) {
				blockNeighbors.push({ row, col });
			}
		});

		// identify row neighbors
		const rowNeighbors = _times(size, (row) => ({
			row: row as RowOrColIndex,
			col: position.col,
		}));
		rowNeighbors.splice(position.row, 1);

		// identify col neighbors
		const colNeighbors = _times(size, (col) => ({
			row: position.row,
			col: col as RowOrColIndex,
		}));
		colNeighbors.splice(position.col, 1);

		// all neighbors
		this.neighbors = _sortedUniqBy(
			[...rowNeighbors, ...colNeighbors, ...blockNeighbors],
			(c) => `${c.row}:${c.col}`,
		);
	}
}

export class SudokuBoard {
	cells: SudokuCell[];

	constructor() {
		this.cells = _times(total, (index) => {
			const position = this.resolveIndex(index);
			return new SudokuCell(position);
		});
	}

	serialize() {
		return this.cells.map((c) => c.value).join('');
	}

	clear() {
		for (const cell of this.cells) {
			cell.value = 0;
		}
	}

	fillCells() {
		return this.doFillCells(0);
	}

	doFillCells(index: number): boolean {
		const cell = this.cells[index];
		const neighborValues = _sortedUniq(
			cell!.neighbors.map((n) => this.at(n).value),
		);
		const remainingOptions = shuffle(_difference(validValues, neighborValues));
		for (const option of remainingOptions) {
			cell!.value = option;

			// either this is the last cell, or the rest are good
			if (index === this.cells.length - 1) {
				return true;
			}
			if (this.doFillCells(index + 1)) {
				return true;
			}
		}

		cell!.value = 0;
		return false;
	}

	resolveIndex(index: number): Coordinate {
		return {
			row: Math.floor(index / size) as RowOrColIndex,
			col: (index % size) as RowOrColIndex,
		};
	}

	resolvePosition(position: Coordinate): number {
		return position.row * size + position.col;
	}

	/**
	 *
	 */
	at(c: Coordinate): SudokuCell {
		return this.cells[this.resolvePosition(c)]!;
	}

	atIndex(index: number): SudokuCell {
		return this.cells[index]!;
	}
}

const generateBoard = (): SudokuBoard => {
	const board = new SudokuBoard();
	board.fillCells();
	return board;
};

export default generateBoard;
