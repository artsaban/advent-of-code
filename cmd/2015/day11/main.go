package main

import (
	"bufio"
	"fmt"
	"os"
)

func getNextPassword(passwordChars []rune) []rune {
	for i := len(passwordChars) - 1; i >= 0; i-- {
		if passwordChars[i] == 'z' {
			passwordChars[i] = 'a'
		} else {
			passwordChars[i]++
			break
		}
	}
	return passwordChars
}

func isValidPassword(passwordChars []rune) bool {
	for _, char := range passwordChars {
		if char == 'i' || char == 'o' || char == 'l' {
			return false
		}
	}

	hasStraight := false
	for i := range len(passwordChars) - 2 {
		if passwordChars[i]+1 == passwordChars[i+1] &&
			passwordChars[i+1]+1 == passwordChars[i+2] {
			hasStraight = true
			break
		}
	}
	if !hasStraight {
		return false
	}

	pairs := make(map[rune]bool)
	for i := 0; i < len(passwordChars)-1; i++ {
		if passwordChars[i] == passwordChars[i+1] {
			pairs[passwordChars[i]] = true
			i++
		}
	}

	return len(pairs) >= 2
}

func part1(password string) string {
	passwordChars := []rune(password)
	for !isValidPassword(passwordChars) {
		passwordChars = getNextPassword(passwordChars)
	}
	return string(passwordChars)
}

func part2(password string) string {
	password = part1(password)
	passwordChars := []rune(password)
	for {
		passwordChars = getNextPassword(passwordChars)
		if isValidPassword(passwordChars) {
			break
		}
	}
	return string(passwordChars)
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	input := scanner.Text()
	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))
}
