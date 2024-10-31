package main

import (
	"os"

	"github.com/artsaban/advent-of-code/internal/solution"
)

type DaySolver struct{}

func (s DaySolver) Part1(data string) int {
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

func (s DaySolver) Part2(data string) int {
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
	solution.NewSolution(os.Stdin, DaySolver{}).Print()
}
