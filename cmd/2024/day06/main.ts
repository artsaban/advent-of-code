import { assertEquals } from "@std/assert";
import { readAll } from "../../../internal/input/input.ts";

function part1(input: string[][]): number {
  let result = 0;
  let [x, y] = findStart(input);
  let dx = -1;
  let dy = 0;

  while (x >= 0 && x < input.length && y >= 0 && y < input[x].length) {
    if (input[x][y] !== "X") {
      result++;
    }
    input[x][y] = "X";
    let i = x + dx;
    let j = y + dy;
    if (input[i]?.[j] === "#") {
      [dx, dy] = rotate(dx, dy);
      i = x + dx;
      j = y + dy;
    }
    x = i;
    y = j;
  }

  return result;
}

function part2(input: string[][]): number {
  let result = 0;
  const [x, y] = findStart(input);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (
        input[i][j] === "." &&
        checkCycle(structuredClone(input), i, j, x, y)
      ) {
        result += 1;
      }
    }
  }

  return result;
}

function findStart(input: string[][]): [number, number] {
  const start: [number, number] = [0, 0];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "^") {
        start[0] = i;
        start[1] = j;
        break;
      }
    }
  }
  return start;
}

function rotate(dx: number, dy: number): [number, number] {
  return [dy, -dx];
}

function checkCycle(
  input: string[][],
  i: number,
  j: number,
  x: number,
  y: number
): boolean {
  input[i][j] = "#";
  const visited = new Set<string>();

  let dx = -1;
  let dy = 0;
  let posX = x;
  let posY = y;

  while (true) {
    const state = `${posX},${posY},${dx},${dy}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);
    const nextX = posX + dx;
    const nextY = posY + dy;
    if (
      nextX < 0 ||
      nextX >= input.length ||
      nextY < 0 ||
      nextY >= input[0].length
    ) {
      return false;
    }
    if (input[nextX][nextY] === "#") {
      [dx, dy] = rotate(dx, dy);
    } else {
      posX = nextX;
      posY = nextY;
    }
  }
}

if (import.meta.main) {
  const input = (await readAll()).split("\n").map((line) => line.split(""));
  console.log("Part 1:", part1(structuredClone(input)));
  console.log("Part 2:", part2(structuredClone(input)));
}

Deno.test("part1", () => {
  const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
    .split("\n")
    .map((line) => line.split(""));

  const start = findStart(input);
  assertEquals(start, [6, 4]);
  assertEquals(part1(input), 41);
});

Deno.test("part2", () => {
  const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
    .split("\n")
    .map((line) => line.split(""));
  assertEquals(part2(input), 6);
});
