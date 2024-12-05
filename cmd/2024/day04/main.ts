import { readLines } from "../../../internal/input/input.ts";

const letters = (await readLines()).map((line) => line.split(""));
console.log(
  `Part 1: ${part1(structuredClone(letters))}\nPart 2: ${part2(letters)}`
);

function part1(input: string[][]): number {
  let result = 0;

  for (let i = 0; i < 4; i++) {
    result += checkForward(input);
    result += checkDiag(input);
    input = rotate(input);
  }

  return result;
}

function part2(input: string[][]): number {
  const rows = input.length;
  const cols = input[0].length;
  const target = "M".charCodeAt(0) + "S".charCodeAt(0);

  let result = 0;
  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {
      if (
        input[x][y] === "A" &&
        input[x - 1][y - 1].charCodeAt(0) +
          input[x + 1][y + 1].charCodeAt(0) ===
          target &&
        input[x + 1][y - 1].charCodeAt(0) +
          input[x - 1][y + 1].charCodeAt(0) ===
          target
      ) {
        result++;
      }
    }
  }

  return result;
}

function rotate(board: string[][]): string[][] {
  const res: string[][] = [];
  for (let i = 0; i < board[0].length; i++) {
    const newRow: string[] = [];
    board.forEach((row) => newRow.push(row[i]));
    res.push(newRow);
  }
  res.forEach((row) => row.reverse());
  return res;
}

function checkForward(board: string[][]): number {
  let count = 0;
  for (const row of board) {
    const rowStr = row.join("");
    count += (rowStr.match(/XMAS/g) || []).length;
  }
  return count;
}

function checkDiag(board: string[][]): number {
  let count = 0;
  const rows = board.length;
  const cols = board[0].length;

  for (let rowStart = 0; rowStart < rows; rowStart++) {
    let diag = "";
    let row = rowStart;
    let col = 0;
    while (row < rows && col < cols) {
      diag += board[row][col];
      row++;
      col++;
    }
    count += (diag.match(/XMAS/g) || []).length;
  }

  for (let colStart = 1; colStart < cols; colStart++) {
    let diag = "";
    let row = 0;
    let col = colStart;
    while (row < rows && col < cols) {
      diag += board[row][col];
      row++;
      col++;
    }
    count += (diag.match(/XMAS/g) || []).length;
  }

  return count;
}
