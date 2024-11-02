package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

const (
	numFmt    = "%s -> %s"
	notFmt    = "NOT %s -> %s"
	andFmt    = "%s AND %s -> %s"
	orFmt     = "%s OR %s -> %s"
	lshiftFmt = "%s LSHIFT %d -> %s"
	rshiftFmt = "%s RSHIFT %d -> %s"
)

var (
	cache   = map[string]uint16{}
	signals = map[string]func() uint16{}
)

func lookup(s string) uint16 {
	if v, ok := cache[s]; ok {
		return v
	}
	if n, err := strconv.Atoi(s); err == nil {
		cache[s] = uint16(n)
		return uint16(n)
	}
	if fn, ok := signals[s]; ok {
		n := fn()
		cache[s] = n
		return n
	}
	panic(fmt.Sprintf("cant locate needed signal { %s }!", s))
}

func part1(input string) int {
	for _, line := range strings.Split(input, "\n") {
		var shift int
		var num, out, lhs, rhs string

		if n, _ := fmt.Sscanf(line, notFmt, &lhs, &out); n == 2 {
			signals[out] = func() uint16 { return ^lookup(lhs) }
		} else if n, _ := fmt.Sscanf(line, orFmt, &lhs, &rhs, &out); n == 3 {
			signals[out] = func() uint16 { return lookup(lhs) | lookup(rhs) }
		} else if n, _ := fmt.Sscanf(line, andFmt, &lhs, &rhs, &out); n == 3 {
			signals[out] = func() uint16 { return lookup(lhs) & lookup(rhs) }
		} else if n, _ := fmt.Sscanf(line, lshiftFmt, &lhs, &shift, &out); n == 3 {
			signals[out] = func() uint16 { return lookup(lhs) << uint16(shift) }
		} else if n, _ := fmt.Sscanf(line, rshiftFmt, &lhs, &shift, &out); n == 3 {
			signals[out] = func() uint16 { return lookup(lhs) >> uint16(shift) }
		} else if n, _ := fmt.Sscanf(line, numFmt, &num, &out); n == 2 {
			signals[out] = func() uint16 { return lookup(num) }
		}

	}

	a := lookup("a")
	return int(a)
}

func part2(input string) int {
	p1 := part1(input)
	signals["b"] = func() uint16 { return uint16(p1) }
	cache = map[string]uint16{}
	p2 := lookup("a")
	return int(p2)
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
