package solution

import (
	"fmt"
	"io"
	"strings"
)

type PartHandler func(input string) int

type Solution struct {
	Part1 int
	Part2 int
}

func NewSolution(reader io.Reader, part1, part2 PartHandler) Solution {
	rawData, err := io.ReadAll(reader)
	if err != nil {
		panic(err)
	}
	data := strings.TrimSuffix(string(rawData), "\n")
	return Solution{
		Part1: part1(data),
		Part2: part2(data),
	}
}

func (s Solution) Print() {
	fmt.Println("Part 1:", s.Part1)
	fmt.Println("Part 2:", s.Part2)
}
