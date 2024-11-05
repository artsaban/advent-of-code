package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

func rleEncode(s string) string {
	format := "%d%c"
	builder := strings.Builder{}
	prev, prevCnt := '\n', -1

	for _, ch := range s {
		if prev == '\n' {
			prev = ch
			prevCnt = 1
		} else if prev != ch {
			builder.WriteString(fmt.Sprintf(format, prevCnt, prev))
			prev = ch
			prevCnt = 1
		} else {
			prevCnt += 1
		}
	}

	if prevCnt > 0 {
		builder.WriteString(fmt.Sprintf(format, prevCnt, prev))
	}

	return builder.String()
}

func part1(input string) int {
	res := input
	for range 40 {
		res = rleEncode(res)
	}
	return len(res)
}

func part2(input string) int {
	res := input
	for range 50 {
		res = rleEncode(res)
	}
	return len(res)
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
