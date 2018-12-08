package main

import (
	"fmt"
	"log"
)

func main() {
	events, err := fetchEvents("1819")
	if err != nil {
		log.Fatalf("failed to fetch events: %v", err)
	}

	for _, event := range events {
		fmt.Printf("%v\n", event)
	}
}
