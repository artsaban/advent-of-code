package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/artsaban/advent-of-code/internal/solution"
)

const input = "yzbqklnj"

type DaySolver struct{}

func getMD5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	hashStr := hex.EncodeToString(hash[:])
	return hashStr
}

func (ds DaySolver) Part1(data string) int {
	num := 1

	for {
		str := fmt.Sprintf("%s%d", data, num)
		hash := getMD5Hash(str)
		if strings.HasPrefix(hash, "00000") {
			break
		}
		num += 1
	}

	return num
}

func (ds DaySolver) Part2(data string) int {
	num := 1

	for {
		str := fmt.Sprintf("%s%d", data, num)
		hash := getMD5Hash(str)
		if strings.HasPrefix(hash, "000000") {
			break
		}
		num += 1
	}

	return num
}

func main() {
	r := strings.NewReader(input)
	solution.NewSolution(r, DaySolver{}).Print()
}
