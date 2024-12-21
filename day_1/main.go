package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// Read the file
	file, err := os.Open("01.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}
	defer file.Close()

	var arr [][]int
	scanner := bufio.NewScanner(file)

	// Parse the file
	for scanner.Scan() {
		row := strings.Fields(scanner.Text())
		leftItem, _ := strconv.Atoi(row[0])
		rightItem, _ := strconv.Atoi(row[1])
		arr = append(arr, []int{leftItem, rightItem})
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error scanning file:", err)
		return
	}

	// Split into left and right arrays
	var left, right []int
	for _, row := range arr {
		left = append(left, row[0])
		right = append(right, row[1])
	}

	// Sort the arrays
	sortInts(left)
	sortInts(right)

	// Part I
	sum := 0
	for i := 0; i < len(left); i++ {
		sum += abs(right[i] - left[i])
	}
	fmt.Println("Part I Sum:", sum)

	// Part II - Using a mapping
	sum = 0
	objectMapping := make(map[int]int)

	// Map the values in the `right` array
	for _, key := range right {
		objectMapping[key] += key
	}

	// Sum values in `left` that exist in the mapping
	for _, key := range left {
		if val, exists := objectMapping[key]; exists {
			sum += val
		}
	}
	fmt.Println("Part II Sum (Mapping Method):", sum)

	// Part II - Using index-based calculation
	sum = 0
	for _, number := range left {
		// Find first occurrence
		leftIdx := indexOf(right, number)
		if leftIdx == -1 {
			continue
		}

		// Find last occurrence
		rightIdx := lastIndexOf(right, number)

		// Calculate the sum
		sum += (rightIdx - leftIdx + 1) * number
	}
	fmt.Println("Part II Sum (Index Method):", sum)
}

/////////////// Utility Functions //////////////////

// Sorts an integer slice
func sortInts(arr []int) {
	for i := 0; i < len(arr)-1; i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] > arr[j] {
				arr[i], arr[j] = arr[j], arr[i]
			}
		}
	}
}

// Absolute value
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// Find the first index of a number in a slice
func indexOf(arr []int, number int) int {
	for i, val := range arr {
		if val == number {
			return i
		}
	}
	return -1
}

// Find the last index of a number in a slice
func lastIndexOf(arr []int, number int) int {
	for i := len(arr) - 1; i >= 0; i-- {
		if arr[i] == number {
			return i
		}
	}
	return -1
}
