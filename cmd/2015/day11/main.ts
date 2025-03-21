function getNextPassword(passwordChars: string[]): string[] {
  for (let i = passwordChars.length - 1; i >= 0; i--) {
    if (passwordChars[i] === "z") {
      passwordChars[i] = "a";
    } else {
      passwordChars[i] = String.fromCharCode(
        passwordChars[i].charCodeAt(0) + 1
      );
      break;
    }
  }
  return passwordChars;
}

function isValidPassword(passwordChars: string[]): boolean {
  if (passwordChars.some((char) => ["i", "o", "l"].includes(char))) {
    return false;
  }

  let hasStraight = false;
  for (let i = 0; i < passwordChars.length - 2; i++) {
    if (
      passwordChars[i].charCodeAt(0) + 1 ===
        passwordChars[i + 1].charCodeAt(0) &&
      passwordChars[i + 1].charCodeAt(0) + 1 ===
        passwordChars[i + 2].charCodeAt(0)
    ) {
      hasStraight = true;
      break;
    }
  }
  if (!hasStraight) return false;

  const pairs = new Set<string>();
  for (let i = 0; i < passwordChars.length - 1; i++) {
    if (passwordChars[i] === passwordChars[i + 1]) {
      pairs.add(passwordChars[i]);
      i++;
    }
  }

  return pairs.size >= 2;
}

function part1(password: string): string {
  let passwordChars = password.split("");
  while (!isValidPassword(passwordChars)) {
    passwordChars = getNextPassword(passwordChars);
  }
  return passwordChars.join("");
}

function part2(password: string): string {
  password = part1(password);
  let passwordChars = password.split("");
  do {
    passwordChars = getNextPassword(passwordChars);
  } while (!isValidPassword(passwordChars));
  return passwordChars.join("");
}

if (import.meta.main) {
  const input = (await Bun.stdin.text()).trim();
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
