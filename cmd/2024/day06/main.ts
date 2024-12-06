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
  return 0;
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

if (import.meta.main) {
  const input = (await readAll()).split("\n").map((line) => line.split(""));
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
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
