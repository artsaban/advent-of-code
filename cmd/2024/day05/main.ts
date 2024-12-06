import { readAll } from "../../../internal/input/input.ts";
import DefaultDict from "../../../internal/defaultdict/index.ts";

if (import.meta.main) {
  const input = await readAll();
  const [rulesRaw, updatesRaw] = input.split("\n\n");
  const rules = rulesRaw.split("\n").map((x) => x.split("|").map(Number));
  const updates = updatesRaw.split("\n").map((x) => x.split(",").map(Number));

  const orderGraph = new DefaultDict<number, number[]>(() => []);
  for (const [from, to] of rules) {
    orderGraph.get(to).push(from);
  }

  console.log(
    `Part 1: ${part1(updates, orderGraph)}\nPart 2: ${part2(
      updates,
      orderGraph
    )}`
  );
}

function part1(
  updates: number[][],
  orderGraph: DefaultDict<number, number[]>
): number {
  let result = 0;
  for (const update of updates) {
    if (isCorrectUpdate(update, orderGraph)) {
      result += update[Math.floor(update.length / 2)];
    }
  }
  return result;
}

function part2(
  updates: number[][],
  orderGraph: DefaultDict<number, number[]>
): number {
  function updateComparator(a: number, b: number): -1 | 0 | 1 {
    const beforeB = orderGraph.get(b);
    if (beforeB.includes(a)) return -1;

    const beforeA = orderGraph.get(a);
    if (beforeA.includes(b)) return 1;

    return 0;
  }

  let result = 0;
  for (const update of updates) {
    if (isCorrectUpdate(update, orderGraph)) continue;
    result += update.sort(updateComparator)[Math.floor(update.length / 2)];
  }
  return result;
}

function isCorrectUpdate(
  update: number[],
  graph: DefaultDict<number, number[]>
) {
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
