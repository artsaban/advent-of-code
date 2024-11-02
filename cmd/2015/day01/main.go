package main

import (
	"os"

	"github.com/artsaban/advent-of-code/internal/solution"
)

func part1(data string) int {
	result := 0
	for _, ch := range data {
		if ch == '(' {
			result++
		} else if ch == ')' {
			result--
		}
	}
	return result
}

func part2(data string) int {
	result := 0
	for idx, ch := range data {
		if ch == '(' {
			result++
		} else if ch == ')' {
			result--
		}
		if result == -1 {
			return idx + 1
		}

	}
	return -1
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
