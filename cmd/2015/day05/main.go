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
		if isNice1(line) {
			nice += 1
		}
	}
	return nice
}

func isNice1(line string) bool {
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
	nice := 0
	for _, line := range strings.Split(data, "\n") {
		if isNice2([]rune(line)) {
			nice += 1
		}
	}
	return nice
}

func isNice2(line []rune) bool {
	c1, c2 := false, false
	// It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
	for i := 1; i < len(line); i++ {
		if s := string([]rune{line[i-1], line[i]}); strings.Contains(string(line[i+1:]), s) {
			c1 = true
		}
	}
	// It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
	for i := 2; i < len(line); i++ {
		p0, p1 := line[i], line[i-2]
		if p0 == p1 {
			c2 = true
		}
	}
	return c1 && c2
}

func main() {
	solution.NewSolution(os.Stdin, DaySolver{}).Print()
}
