package main

import (
	"os"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

func part1(input string) int {
	res := 0
	inMemoryLen := func(s string) int {
		l := len(s) - 2
		for i := 0; i < len(s)-1; i += 1 {
			switch ch, nch := s[i], s[i+1]; {
			case ch == '\\' && nch == '\\':
				l -= 1
				i += 1
			case ch == '\\' && nch == '"':
				l -= 1
				i += 1
			case ch == '\\' && nch == 'x':
				l -= 3
				i += 3
			}
		}
		return l
	}
	for _, line := range strings.Split(input, "\n") {
		a := len(line)
		b := inMemoryLen(line)
		res += a - b
	}
	return res
}

func part2(input string) int {
	res := 0
	for _, line := range strings.Split(input, "\n") {
		enc := encodeAsString(line)
		res += len(enc) - len(line)
	}
	return res
}

func encodeAsString(line string) string {
	builder := strings.Builder{}
	rules := map[byte]string{
		'"':  "\\\"",
		'\\': "\\\\",
	}
	builder.WriteRune('"')
	for i := 0; i < len(line); i += 1 {
		if v, ok := rules[line[i]]; ok {
			builder.WriteString(v)
		} else {
			builder.WriteByte(line[i])
		}
	}
	builder.WriteRune('"')
	return builder.String()
}

func main() {
	solution.NewSolution(os.Stdin, part1, part2).Print()
}
