package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

const redValue = "red"

func part1(input any) int {
	var sum int

	var traverse func(node any)
	traverse = func(node any) {
		switch v := node.(type) {
		case []any:
			for _, x := range v {
				traverse(x)
			}
		case map[string]any:
			for _, x := range v {
				traverse(x)
			}
		case float64:
			sum += int(v)
		}
	}

	traverse(input)
	return sum
}

func part2(input any) int {
	var sum int

	var traverse func(node any)
	traverse = func(node any) {
		switch v := node.(type) {
		case []any:
			for _, x := range v {
				traverse(x)
			}
		case map[string]any:
			hasRed := false
			for _, x := range v {
				if str, ok := x.(string); ok && str == redValue {
					hasRed = true
					break
				}
			}
			if !hasRed {
				for _, x := range v {
					traverse(x)
				}
			}
		case float64:
			sum += int(v)
		}
	}

	traverse(input)
	return sum
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return fmt.Errorf("reading input: %w", err)
	}

	var jsonData any
	if err := json.Unmarshal(input, &jsonData); err != nil {
		return fmt.Errorf("parsing JSON: %w", err)
	}

	fmt.Println(part1(jsonData))
	fmt.Println(part2(jsonData))
	return nil
}
