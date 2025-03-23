import { MapWithDefault } from "../../../internal/map-with-default";

const lineRegex =
  /^(?<name>\w+) would (?<sign>gain|lose) (?<amount>\d+) happiness units by sitting next to (?<neighbor>\w+)\.$/;

if (import.meta.main) {
  const input = (await Bun.stdin.text()).trim().split("\n");
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}

function part1(lines: string[]): number {
  const happinessGraph = new MapWithDefault<string, Map<string, number>>(
    () => new Map()
  );

  for (const line of lines) {
    const m = line.match(lineRegex);

    if (!m || !m.groups) {
      continue;
    }

    const { name, sign, amount, neighbor } = m.groups;
    const amountNumber = sign === "gain" ? Number(amount) : -Number(amount);
    happinessGraph.get(name).set(neighbor, amountNumber);
  }

  const people = Array.from(happinessGraph.keys());
  let maxHappiness = -Infinity;

  for (const p of permute(people)) {
    const happiness = calculateHappiness(p, happinessGraph);
    if (happiness > maxHappiness) {
      maxHappiness = happiness;
    }
  }

  return maxHappiness;
}

function part2(lines: string[]): number {
  const names = new Set<string>();

  for (const line of lines) {
    const m = line.match(lineRegex);
    if (!m || !m.groups) {
      continue;
    }

    names.add(m.groups.name);
  }

  for (const name of names) {
    lines.push(`You would gain 0 happiness units by sitting next to ${name}.`);
  }

  return part1(lines);
}

function calculateHappiness(
  p: string[],
  happinessGraph: Map<string, Map<string, number>>
): number {
  let happiness = 0;
  for (let i = 0; i < p.length; i++) {
    const current = p[i];
    const next = p[(i + 1) % p.length];
    happiness += happinessGraph.get(current)?.get(next) ?? 0;
    happiness += happinessGraph.get(next)?.get(current) ?? 0;
  }
  return happiness;
}

function* permute<T>(iterable: Iterable<T>): IterableIterator<T[]> {
  const arr = Array.from(iterable);

  function* permuteHelper(start: number): Generator<T[]> {
    if (start === arr.length - 1) {
      yield [...arr];
      return;
    }

    const seen = new Set<T>();
    for (let i = start; i < arr.length; i++) {
      if (seen.has(arr[i])) continue;
      seen.add(arr[i]);

      [arr[start], arr[i]] = [arr[i], arr[start]];
      yield* permuteHelper(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  yield* permuteHelper(0);
}
