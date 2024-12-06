import { assert } from "@std/assert";
import { readLines } from "../../../internal/input/input.ts";

if (import.meta.main) {
  const { leftNums, rightNums } = await preprocessInput();
  console.log(part1(leftNums, rightNums));
  console.log(part2(leftNums, rightNums));
}

async function preprocessInput(): Promise<{
  leftNums: number[];
  rightNums: number[];
}> {
  const leftNums = [];
  const rightNums = [];

  for (const line of await readLines()) {
    const [left, right] = line.split(/\s+/).map(Number);
    leftNums.push(left);
    rightNums.push(right);
  }

  assert(
    leftNums.length === rightNums.length,
    "left and right nums must be equal"
  );
  return { leftNums, rightNums };
}

function part1(leftNums: number[], rightNums: number[]): number {
  let result = 0;
  const l = leftNums.toSorted();
  const r = rightNums.toSorted();

  for (let i = 0; i < leftNums.length; i++) {
    result += Math.abs(l[i] - r[i]);
  }

  return result;
}

function part2(leftNums: number[], rightNums: number[]): number {
  let result = 0;
  const counts = new Map<number, number>();
  for (const num of rightNums) {
    counts.set(num, (counts.get(num) ?? 0) + 1);
  }

  for (const num of leftNums) {
    result += (counts.get(num) ?? 0) * num;
  }

  return result;
}
