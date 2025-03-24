import { assert } from "../../../internal/assert";

const referenceSue = new Map([
  ["children", 3],
  ["cats", 7],
  ["samoyeds", 2],
  ["pomeranians", 3],
  ["akitas", 0],
  ["vizslas", 0],
  ["goldfish", 5],
  ["trees", 3],
  ["cars", 2],
  ["perfumes", 1],
]);

if (import.meta.main) {
  const lineRegex = /^Sue (\d+): (.*)$/i;
  const input = (await Bun.stdin.text())
    .trim()
    .split("\n")
    .map((line) => {
      const match = line.match(lineRegex);
      assert(match, "Invalid line");
      const [, id, properties] = match;
      return {
        id: Number(id),
        properties: properties.split(", ").map((prop) => {
          const [key, value] = prop.split(": ");
          return { key, value: Number(value) };
        }),
      };
    });

  console.log("Part 1:", part1(input));
}

function part1(
  input: {
    id: number;
    properties: {
      key: string;
      value: number;
    }[];
  }[]
) {
  for (const sue of input) {
    if (
      sue &&
      sue.properties.every((x) => {
        return referenceSue.get(x.key) === x.value;
      })
    ) {
      return sue.id;
    }
  }
}
