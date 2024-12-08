function getCombinationsByTwo(elements) {
  const combinations = [];
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      combinations.push([elements[i], elements[j]]);
    }
  }
  return combinations;
}

const map = $0.textContent
  .trim()
  .split("\n")
  .map((row) => row.split(""));
const m = map.length;
const n = map[0].length;
const coordinates = new Map();

for (let i = 0; i < m; ++i) {
  for (let j = 0; j < n; ++j) {
    const v = map[i][j];
    if (v === ".") {
      continue;
    }
    if (!coordinates.has(v)) {
      coordinates.set(v, [{ x: i, y: j }]);
    } else {
      coordinates.get(v).push({ x: i, y: j });
    }
  }
}

let res = 0;
const antinodes = new Set();
const antinodesMap = Array.from({ length: m }, () => Array(n).fill("."));

for (const values of coordinates.values()) {
  const combinations = getCombinationsByTwo(values);
  for (const [p1, p2] of combinations) {
    if (p1.x > p2.x) throw Error("assert");
    const dx = Math.abs(p1.x - p2.x);
    const dy = Math.abs(p1.y - p2.y);
    const an1 = { x: 0, y: 0 };
    const an2 = { x: 0, y: 0 };
    if (p2.y > p1.y) {
      an1.x = p1.x - dx;
      an1.y = p1.y - dy;
      an2.x = p2.x + dx;
      an2.y = p2.y + dy;
    } else {
      an1.x = p1.x - dx;
      an1.y = p1.y + dy;
      an2.x = p2.x + dx;
      an2.y = p2.y - dy;
    }
    if (an1.x >= 0 && an1.x < m && an1.y >= 0 && an1.y < n) {
      antinodesMap[an1.x][an1.y] = "#";
      antinodes.add(`${an1.x}-${an1.y}`);
      res += 1;
    }
    if (an2.x >= 0 && an2.x < m && an2.y >= 0 && an2.y < n) {
      antinodesMap[an2.x][an2.y] = "#";
      antinodes.add(`${an2.x}-${an2.y}`);
      res += 1;
    }
  }
}

console.log("Part 1:", antinodes.size);
console.log(antinodesMap.map((x) => x.join("")).join("\n"));
