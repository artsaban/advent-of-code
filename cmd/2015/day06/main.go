package main

import (
	"os"
	"strconv"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

const (
	turn   = "turn"
	on     = "on"
	off    = "off"
	toggle = "toggle"
)

type DaySolver struct{}

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

func parseCoordinates(l string, r string) (int, int, int, int) {
	lxy, rxy := strings.Split(l, ","), strings.Split(r, ",")
	lx, err := strconv.Atoi(lxy[0])
	if err != nil {
		panic("cant parse coordinate")
	}
	rx, err := strconv.Atoi(rxy[0])
	if err != nil {
		panic("cant parse coordinate")
	}
	ly, err := strconv.Atoi(lxy[1])
	if err != nil {
		panic("cant parse coordinate")
	}
	ry, err := strconv.Atoi(rxy[1])
	if err != nil {
		panic("cant parse coordinate")
	}
	return lx, rx, ly, ry
}

func (ds DaySolver) Part1(input string) int {
	var lights [1000][1000]bool
	lines := strings.Split(input, "\n")

	for _, line := range lines {
		switch command := strings.Split(line, " "); {
		case command[0] == turn && command[1] == on:
			a, b, c, d := parseCoordinates(command[2], command[4])
			executeCommand("turn on", a, b, c, d, &lights)
		case command[0] == turn && command[1] == off:
			a, b, c, d := parseCoordinates(command[2], command[4])
			executeCommand("turn off", a, b, c, d, &lights)
		case command[0] == toggle:
			a, b, c, d := parseCoordinates(command[1], command[3])
			executeCommand("toggle", a, b, c, d, &lights)
		default:
			panic("unreachable")
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

func (ds DaySolver) Part2(input string) int {
	var brightness [1000][1000]int
	lines := strings.Split(input, "\n")

	for _, line := range lines {
		switch command := strings.Split(line, " "); {
		case command[0] == turn && command[1] == on:
			a, b, c, d := parseCoordinates(command[2], command[4])
			executeCommandBrightness("turn on", a, b, c, d, &brightness)
		case command[0] == turn && command[1] == off:
			a, b, c, d := parseCoordinates(command[2], command[4])
			executeCommandBrightness("turn off", a, b, c, d, &brightness)
		case command[0] == toggle:
			a, b, c, d := parseCoordinates(command[1], command[3])
			executeCommandBrightness("toggle", a, b, c, d, &brightness)
		default:
			panic("unreachable")
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
	solution.NewSolution(os.Stdin, DaySolver{}).Print()
}
