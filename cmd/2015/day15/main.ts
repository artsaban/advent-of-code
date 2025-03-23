type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

if (import.meta.main) {
  const input: Ingredient[] = (await Bun.stdin.text())
    .trim()
    .matchAll(
      /(.*): capacity (.*), durability (.*), flavor (.*), texture (.*), calories (.*)/gi
    )
    .map((match) => {
      return {
        name: match[1],
        capacity: Number(match[2]),
        durability: Number(match[3]),
        flavor: Number(match[4]),
        texture: Number(match[5]),
        calories: Number(match[6]),
      };
    })
    .toArray();

  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}

function part1(input: Ingredient[]): number {
  let maxScore = -Infinity;
  const totalTeaspoons = 100;

  for (let i = 0; i <= totalTeaspoons; i++) {
    for (let j = 0; j <= totalTeaspoons - i; j++) {
      for (let k = 0; k <= totalTeaspoons - i - j; k++) {
        const l = totalTeaspoons - i - j - k;

        let capacity = 0;
        let durability = 0;
        let flavor = 0;
        let texture = 0;

        capacity += input[0].capacity * i;
        durability += input[0].durability * i;
        flavor += input[0].flavor * i;
        texture += input[0].texture * i;

        capacity += input[1].capacity * j;
        durability += input[1].durability * j;
        flavor += input[1].flavor * j;
        texture += input[1].texture * j;

        capacity += input[2].capacity * k;
        durability += input[2].durability * k;
        flavor += input[2].flavor * k;
        texture += input[2].texture * k;

        capacity += input[3].capacity * l;
        durability += input[3].durability * l;
        flavor += input[3].flavor * l;
        texture += input[3].texture * l;

        if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
          continue;
        }

        const score = capacity * durability * flavor * texture;
        maxScore = Math.max(maxScore, score);
      }
    }
  }

  return maxScore;
}

function part2(input: Ingredient[]): number {
  let maxScore = -Infinity;
  const totalTeaspoons = 100;

  for (let i = 0; i <= totalTeaspoons; i++) {
    for (let j = 0; j <= totalTeaspoons - i; j++) {
      for (let k = 0; k <= totalTeaspoons - i - j; k++) {
        const l = totalTeaspoons - i - j - k;

        let capacity = 0;
        let durability = 0;
        let flavor = 0;
        let texture = 0;
        let calories = 0;

        capacity += input[0].capacity * i;
        durability += input[0].durability * i;
        flavor += input[0].flavor * i;
        texture += input[0].texture * i;
        calories += input[0].calories * i;

        capacity += input[1].capacity * j;
        durability += input[1].durability * j;
        flavor += input[1].flavor * j;
        texture += input[1].texture * j;
        calories += input[1].calories * j;

        capacity += input[2].capacity * k;
        durability += input[2].durability * k;
        flavor += input[2].flavor * k;
        texture += input[2].texture * k;
        calories += input[2].calories * k;

        capacity += input[3].capacity * l;
        durability += input[3].durability * l;
        flavor += input[3].flavor * l;
        texture += input[3].texture * l;
        calories += input[3].calories * l;

        if (
          capacity < 0 ||
          durability < 0 ||
          flavor < 0 ||
          texture < 0 ||
          calories !== 500
        ) {
          continue;
        }

        const score = capacity * durability * flavor * texture;
        maxScore = Math.max(maxScore, score);
      }
    }
  }

  return maxScore;
}
