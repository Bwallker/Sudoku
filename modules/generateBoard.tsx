import { ReactNode } from 'react';

type Board = number[][];
const generateBoard = (numberOfGivenDigits: number): Board => {
  const board: number[][] = [];
  for (let i = 0; i < 9; i++) {
    const row: number[] = [];

    for (let j = 0; j < 9; j++) {
      row.push(0);
    }

    board.push(row);
  }
  for (let i = 0; i < numberOfGivenDigits; i++) {
    board[i]?.pop();
    board[i]?.push(1);
  }
  return board;
};

export const boardToString = (board: Board) => {
  const res: ReactNode[] = [];

  for (const row of board) {
    res.push(<p>{row}</p>);
  }

  return res;
};
export default generateBoard;
