package main

import (
	"os"

	"github.com/artsaban/advent-of-code/internal/solution"
)

type shift struct {
	x, y int
}

func (s shift) next(dir rune) shift {
	newShift := shift{x: s.x, y: s.y}
	switch dir {
	case '^':
		newShift.y += 1
	case '>':
		newShift.x += 1
	case 'v':
		newShift.y -= 1
	case '<':
		newShift.x -= 1
	default:
		panic("unreachable")
	}
	return newShift
}

func part1(data string) int {
	shifts := make(map[shift]int)
	start := shift{}
	shifts[start] = 1
	for _, ch := range data {
		start = start.next(ch)
		if _, ok := shifts[start]; ok {
			shifts[start] += 1
		} else {
			shifts[start] = 1
		}
	}

	result := 0
	for range shifts {
		result += 1
	}

	return result
}

func part2(data string) int {
	shifts := make(map[shift]int)
	moveAgent := func(agent shift) {
		if _, ok := shifts[agent]; ok {
			shifts[agent] += 1
		} else {
			shifts[agent] = 1
		}
	}

	santa := shift{}
	roboSanta := shift{}
	shifts[santa] = 2
	for i, ch := range data {
		if i%2 != 0 {
			santa = santa.next(ch)
			moveAgent(santa)
		} else {
			roboSanta = roboSanta.next(ch)
			moveAgent(roboSanta)
		}
	}

	result := 0
	for range shifts {
		result += 1
	}

	return result
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
