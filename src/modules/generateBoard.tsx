import { ReactNode } from 'react';
import { randomInt } from '../util/random';
import BoardIndex from '../../generated/BoardIndex';

type Board = Row[];
type NullableNumber = number | undefined;
type Row = NullableNumber[];
type RowOrColIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type BoxNumber = RowOrColIndex;
const generateBoard = (numberOfGivenDigits: number): Board => {
  const board = createBaseBoard(randomInt(5, 10));
  return board;
};

const findNextValidDigit = (
  board: Board,
  index: BoardIndex,
): number | undefined => {
  const row = index / 9;
  const col = index % 9;
  const neighbours = findNeighbours(
    board,
    row as RowOrColIndex,
    col as RowOrColIndex,
  );
  for (let i = 1; i < 10; i++) {
    if (neighbours.has(i)) {
      continue;
    }
    return i;
  }
  return undefined;
};

const findNeighbours = (
  board: Board,
  row: RowOrColIndex,
  col: RowOrColIndex,
): Set<number> => {
  const result = new Set<number>();

  for (let i = 0; i < 9; i++) {
    const num = board[i]?.[col];
    if (num === undefined) {
      continue;
    }
    result.add(num);
  }
  for (let i = 0; i < 9; i++) {
    const num = board[row]?.[i];
    if (num === undefined) {
      continue;
    }
    result.add(num);
  }

  return result;
};

const getBoxNumber = (
  board: Board,
  row: RowOrColIndex,
  col: RowOrColIndex,
): BoxNumber => {
  if (row < 3) {
    if (col < 3) {
      return 0;
    }
    if (col < 6) {
      return 1;
    }
    return 2;
  }
  if (row < 6) {
    if (col < 3) {
      return 3;
    }
    if (col < 6) {
      return 4;
    }
    return 5;
  }
  if (col < 3) {
    return 6;
  }
  if (col < 6) {
    return 7;
  }
  return 8;
};

const createBaseBoard = (numberOfRandomDigits: number): Board => {
  const board: Board = [];

  for (let i = 0; i < 9; i++) {
    const row: Row = [];

    for (let j = 0; j < 9; j++) {
      row.push(undefined);
    }
    board.push(row);
  }
  let numberOfGeneratedDigits = 0;
  while (true) {
    if (numberOfGeneratedDigits === numberOfRandomDigits) {
      break;
    }
    const randomRow = randomInt(0, 9);
    const randomCol = randomInt(0, 9);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (board[randomRow]![randomCol]! !== 0) {
      continue;
    }
    const randomDigit = randomInt(1, 10);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    board[randomRow]![randomCol]! = randomDigit;
    numberOfGeneratedDigits++;
  }
  console.log(board);
  return board;
};

export const boardToString = (board: Board) => {
  const res: ReactNode[] = [];
  let i = 0;
  for (const row of board) {
    res.push(<p key={i++}>{row}</p>);
  }

  return res;
};

export default generateBoard;
