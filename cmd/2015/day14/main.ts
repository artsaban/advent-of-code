type Reindeer = {
  name: string;
  speed: number;
  flyTime: number;
  restTime: number;
};

const dataRegex =
  /(.*?) can fly (.*?) km\/s for (.*?) seconds, but then must rest for (.*?) seconds./g;

const totalRaceTime = 2503;

if (import.meta.main) {
  const reindeer: Reindeer[] = (await Bun.stdin.text())
    .matchAll(dataRegex)
    .map(([, name, speed, flyTime, restTime]) => ({
      name,
      speed: Number(speed),
      flyTime: Number(flyTime),
      restTime: Number(restTime),
    }))
    .toArray();

  console.log("Part 1:", part1(reindeer));
  console.log("Part 2:", part2(reindeer));
}

function part1(reindeer: Reindeer[]): number {
  let maxDistance = -Infinity;
  for (const rd of reindeer) {
    maxDistance = Math.max(maxDistance, modelRace(rd));
  }
  return maxDistance;
}

function part2(reindeer: Reindeer[]): number {
  type ReindeerWithState = Reindeer & {
    distance: number;
    points: number;
    state: number;
  };

  function getMaxDistance(r: ReindeerWithState[]): number {
    let max = r[0].distance;
    for (let i = 1; i < r.length; ++i) {
      if (r[i].distance > max) {
        max = r[i].distance;
      }
    }
    return max;
  }

  function getMaxPoints(r: ReindeerWithState[]): number {
    let max = r[0].points;
    for (let i = 1; i < r.length; ++i) {
      if (r[i].points > max) {
        max = r[i].points;
      }
    }
    return max;
  }

  const rWithState: ReindeerWithState[] = reindeer.map((x) => ({
    ...x,
    distance: 0,
    points: 0,
    state: x.flyTime,
  }));

  let tick = totalRaceTime;
  while (tick > 0) {
    for (const r of rWithState) {
      if (r.state < 0) {
        r.state += 1;
        if (r.state === 0) {
          r.state = r.flyTime;
        }
        continue;
      }

      if (r.state > 0) {
        r.state -= 1;
        r.distance += r.speed;
        if (r.state === 0) {
          r.state = -r.restTime;
        }
        continue;
      }

      throw new Error("unreachable");
    }

    const maxDistance = getMaxDistance(rWithState);

    for (const r of rWithState) {
      if (r.distance === maxDistance) {
        r.points += 1;
      }
    }

    tick -= 1;
  }

  return getMaxPoints(rWithState);
}

function modelRace({ speed, flyTime, restTime }: Reindeer): number {
  const distanceChunk = speed * flyTime;
  let totalTime = totalRaceTime;
  let distance = 0;

  while (totalTime > flyTime) {
    distance += distanceChunk;
    totalTime -= flyTime + restTime;
  }

  return distance;
}
