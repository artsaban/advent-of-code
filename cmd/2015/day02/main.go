package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

const foramt = "%dx%dx%d"

func part1(data string) int {
	result := 0
	lines := strings.Split(data, "\n")

	for _, line := range lines {
		var l, w, h int
		if n, _ := fmt.Sscanf(line, foramt, &l, &w, &h); n == 3 {
			p1 := l * w
			p2 := w * h
			p3 := h * l
			area := 2 * (p1 + p2 + p3)
			area += min(p1, p2, p3)
			result += area
		}
	}

	return result
}

func part2(data string) int {
	result := 0
	lines := strings.Split(data, "\n")
	for _, line := range lines {
		var l, w, h int
		if n, _ := fmt.Sscanf(line, foramt, &l, &w, &h); n == 3 {
			var m1, m2 int
			if l < w {
				m1 = l
				m2 = min(w, h)
			} else {
				m1 = w
				m2 = min(l, h)
			}
			result += 2*(m1+m2) + l*w*h

		}

	}
	return result
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
