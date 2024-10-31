package main

import (
	"os"
	"strconv"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

type DaySolver struct{}

func (s DaySolver) Part1(data string) int {
	result := 0
	lines := strings.Split(data, "\n")

	for _, line := range lines {
		size := strings.Split(line, "x")

		var l, w, h int
		if v, err := strconv.Atoi(size[0]); err == nil {
			l = v
		}
		if v, err := strconv.Atoi(size[1]); err == nil {
			w = v
		}
		if v, err := strconv.Atoi(size[2]); err == nil {
			h = v
		}

		p1 := l * w
		p2 := w * h
		p3 := h * l
		area := 2 * (p1 + p2 + p3)
		area += min(p1, p2, p3)
		result += area
	}

	return result
}

func (s DaySolver) Part2(data string) int {
	result := 0
	lines := strings.Split(data, "\n")

	for _, line := range lines {
		size := strings.Split(line, "x")

		var l, w, h int
		if v, err := strconv.Atoi(size[0]); err == nil {
			l = v
		}
		if v, err := strconv.Atoi(size[1]); err == nil {
			w = v
		}
		if v, err := strconv.Atoi(size[2]); err == nil {
			h = v
		}

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

	return result
}

func main() {
	solution.NewSolution(os.Stdin, DaySolver{}).Print()
}
