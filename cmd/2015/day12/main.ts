function part1(input: any) {
  let sum = 0;

  function traverse(node: any) {
    if (Array.isArray(node)) {
      node.forEach((x) => traverse(x));
    } else if (typeof node === "object" && node !== null) {
      const values = Object.values(node);
      values.forEach((x) => traverse(x));
    } else if (typeof node === "number") {
      sum += node;
    }
  }

  traverse(input);
  return sum;
}

function part2(input: any) {
  let sum = 0;

  function traverse(node: any) {
    if (Array.isArray(node)) {
      node.forEach((x) => traverse(x));
    } else if (typeof node === "object" && node !== null) {
      const values = Object.values(node);
      if (values.includes("red")) {
        return;
      }
      values.forEach((x) => traverse(x));
    } else if (typeof node === "number") {
      sum += node;
    }
  }

  traverse(input);
  return sum;
}

if (import.meta.main) {
  const input = await Bun.stdin.text();
  const json = JSON.parse(input);
  console.log(part1(json));
  console.log(part2(json));
}
