package main

import (
	"os"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

type DaySolver struct{}

func (ds DaySolver) Part1(data string) int {
	nice := 0
	for _, line := range strings.Split(data, "\n") {
		if isNice(line) {
			nice += 1
		}
	}
	return nice
}

func isNice(line string) bool {
	c1 := 0
	c2 := false
	c3 := true
	rLine := []rune(line)
	for i, ch := range line {
		// It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
		if ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' {
			c1 += 1
		}
		if i == 0 {
			continue
		}
		pCh := rLine[i-1]
		// It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
		if pCh == ch {
			c2 = true
		}
		// It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
		if (pCh == 'a' && ch == 'b') || (pCh == 'c' && ch == 'd') || (pCh == 'p' && ch == 'q') || (pCh == 'x' && ch == 'y') {
			c3 = false
		}
	}
	return c1 >= 3 && c2 && c3
}

func (ds DaySolver) Part2(data string) int {
	// c1, c2 := false, false
	// rLine := []rune(data)
	// for i, ch := range rLine {
	// }
	return 0
}

func main() {
	solution.NewSolution(os.Stdin, DaySolver{}).Print()
}
