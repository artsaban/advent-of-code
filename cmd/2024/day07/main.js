// This day written using only browser, page with task input and snippets tab in Chrome DevTools.
// To run this solution, open the input page in the browser and execute the script in the console.

const lines = $("pre").textContent.trim().split("\n");
console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  let output = 0;

  outer: for (const line of lines) {
    const [head, tail] = line.split(": ");
    const result = Number(head);
    const nums = tail.split(" ").map(Number);

    let opsState = 0;
    while (opsState <= 2 ** (nums.length - 1) - 1) {
      const operations = opsState.toString(2).padStart(nums.length - 1, "0");
      let exprResult = nums[0];
      for (let i = 0; i < operations.length; i++) {
        if (operations[i] === "0") {
          exprResult += nums[i + 1];
        } else {
          exprResult *= nums[i + 1];
        }
      }
      if (exprResult === result) {
        output += result;
        continue outer;
      }
      opsState += 1;
    }
  }

  return output;
}

function part2() {
  let output = 0;

  outer: for (const line of lines) {
    const [head, tail] = line.split(": ");
    const result = Number(head);
    const nums = tail.split(" ").map(Number);

    let opsState = 0;
    while (opsState <= 3 ** (nums.length - 1) - 1) {
      const operations = opsState.toString(3).padStart(nums.length - 1, "0");
      let exprResult = nums[0];
      for (let i = 0; i < operations.length; i++) {
        if (operations[i] === "0") {
          exprResult += nums[i + 1];
        } else if (operations[i] === "1") {
          exprResult *= nums[i + 1];
        } else {
          exprResult = Number(`${exprResult}${nums[i + 1]}`);
        }
      }
      if (exprResult === result) {
        output += result;
        continue outer;
      }
      opsState += 1;
    }
  }

  return output;
}
