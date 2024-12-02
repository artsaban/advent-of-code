import { readLines } from "../../../internal/input/input.ts";

const reports = (await readLines()).map((line) => line.split(" ").map(Number));
console.log(`Part 1: ${part1(reports)}\nPart 2: ${part2(reports)}`);

function part1(reports: number[][]) {
  return reports.filter(isSafeReport).length;
}

function part2(reports: number[][]) {
  return reports.filter(isSafeReportWithDampener).length;
}

function isSafeReport(report: number[]): boolean {
  if (report[0] === report[1]) {
    return false;
  }
  if (
    report[0] < report[1] &&
    Math.abs(report[0] - report[1]) >= 1 &&
    Math.abs(report[0] - report[1]) <= 3
  ) {
    for (let i = 1; i < report.length; i++) {
      if (
        report[i] <= report[i - 1] ||
        Math.abs(report[i] - report[i - 1]) > 3
      ) {
        return false;
      }
    }
    return true;
  } else if (
    report[0] > report[1] &&
    Math.abs(report[0] - report[1]) >= 1 &&
    Math.abs(report[0] - report[1]) <= 3
  ) {
    for (let i = 1; i < report.length; i++) {
      if (
        report[i] >= report[i - 1] ||
        Math.abs(report[i] - report[i - 1]) > 3
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isSafeReportWithDampener(report: number[]): boolean {
  if (isSafeReport(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    if (isSafeReport(report.toSpliced(i, 1))) {
      return true;
    }
  }
  return false;
}
