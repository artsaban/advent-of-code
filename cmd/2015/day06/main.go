package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

const (
	turnOnFmt  = "turn on %d,%d through %d,%d"
	turnOffFmt = "turn off %d,%d through %d,%d"
	toggleFmt  = "toggle %d,%d through %d,%d"
)

func executeCommand(command string, a, b, c, d int, lights *[1000][1000]bool) {
	for i := a; i <= b; i++ {
		for j := c; j <= d; j++ {
			switch command {
			case "turn on":
				lights[i][j] = true
			case "turn off":
				lights[i][j] = false
			case "toggle":
				lights[i][j] = !lights[i][j]
			default:
				panic("unreachable")
			}
		}
	}
}

func executeCommandBrightness(command string, a, b, c, d int, lights *[1000][1000]int) {
	for i := a; i <= b; i++ {
		for j := c; j <= d; j++ {
			switch command {
			case "turn on":
				lights[i][j] += 1
			case "turn off":
				val := max(0, lights[i][j]-1)
				lights[i][j] = val
			case "toggle":
				lights[i][j] += 2
			default:
				panic("unreachable")
			}
		}
	}
}

func part1(input string) int {
	var lights [1000][1000]bool
	lines := strings.Split(input, "\n")

	for _, line := range lines {
		var a, b, c, d int

		if _, err := fmt.Sscanf(line, turnOnFmt, &a, &c, &b, &d); err == nil {
			executeCommand("turn on", a, b, c, d, &lights)
		} else if _, err := fmt.Sscanf(line, turnOffFmt, &a, &c, &b, &d); err == nil {
			executeCommand("turn off", a, b, c, d, &lights)
		} else if _, err := fmt.Sscanf(line, toggleFmt, &a, &c, &b, &d); err == nil {
			executeCommand("toggle", a, b, c, d, &lights)
		}

	}

	result := 0
	for i := 0; i < 1000; i++ {
		for j := 0; j < 1000; j++ {
			if lights[i][j] {
				result++
			}
		}
	}
	return result
}

func part2(input string) int {
	var brightness [1000][1000]int
	lines := strings.Split(input, "\n")

	for _, line := range lines {
		var a, b, c, d int
		if _, err := fmt.Sscanf(line, turnOnFmt, &a, &c, &b, &d); err == nil {
			executeCommandBrightness("turn on", a, b, c, d, &brightness)
		} else if _, err := fmt.Sscanf(line, turnOffFmt, &a, &c, &b, &d); err == nil {
			executeCommandBrightness("turn off", a, b, c, d, &brightness)
		} else if _, err := fmt.Sscanf(line, toggleFmt, &a, &c, &b, &d); err == nil {
			executeCommandBrightness("toggle", a, b, c, d, &brightness)
		}
	}

	result := 0
	for i := 0; i < 1000; i++ {
		for j := 0; j < 1000; j++ {
			result += brightness[i][j]
		}
	}
	return result
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
