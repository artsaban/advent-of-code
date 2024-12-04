import { readAll } from "../../../internal/input/input.ts";

const memory = await readAll();
console.log(`Part 1: ${part1(memory)}\nPart 2: ${part2(memory)}`);

function part1(memory: string) {
  let result = 0;
  const regexp = /mul\((\d+),(\d+)\)/g;
  const matchIterator = memory.matchAll(regexp);
  for (const match of matchIterator) {
    const [, x, y] = match;
    result += Number(x) * Number(y);
  }
  return result;
}

function part2(memory: string) {
  let result = 0;
  let state = true;
  const regexp = /(mul\((\d+),(\d+)\)|don\'t\(\)|do\(\))/g;
  const matchIterator = memory.matchAll(regexp);
  for (const match of matchIterator) {
    const [, op, x, y] = match;
    if (op === "don't()") {
      state = false;
    } else if (op === "do()") {
      state = true;
    } else if (state) {
      result += Number(x) * Number(y);
    }
  }
  return result;
}
