import { readAll } from "../../../internal/input/input.ts";
import DefaultDict from "../../../internal/defaultdict/index.ts";

const input = await readAll();
const [rulesRaw, updatesRaw] = input.split("\n\n");
const rules = rulesRaw.split("\n").map((x) => x.split("|").map(Number));
const updates = updatesRaw.split("\n").map((x) => x.split(",").map(Number));

function part1(): number {
  const graph = new DefaultDict<number, number[]>(() => []);
  for (const [from, to] of rules) {
    graph.get(to).push(from);
  }

  function isCorrect(update: number[]) {
    for (let i = 0; i < update.length; i++) {
      const u = update[i];
      const after = update.slice(i + 1);
      const requiredPages = graph.get(u);
      if (requiredPages.some((x) => after.includes(x))) {
        return false;
      }
    }
    return true;
  }

  let result = 0;
  for (const update of updates) {
    if (isCorrect(update)) {
      result += update[Math.floor(update.length / 2)];
    }
  }
  return result;
}

console.log("Part 1:", part1());
