package solution

import (
	"fmt"
	"io"
	"strings"
)

type Solver interface {
	Part1(input string) int
	Part2(input string) int
}

type Solution struct {
	part1 int
	part2 int
}

func NewSolution(reader io.Reader, solver Solver) Solution {
	rawData, err := io.ReadAll(reader)
	if err != nil {
		panic(err)
	}
	data := strings.TrimSuffix(string(rawData), "\n")
	return Solution{
		part1: solver.Part1(data),
		part2: solver.Part2(data),
	}
}

func (s Solution) Print() {
	fmt.Println("Part 1:", s.part1)
	fmt.Println("Part 2:", s.part2)
}
