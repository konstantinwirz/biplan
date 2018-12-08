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
		// get competitions
		competitions, err := fetchCompetitions(event.ID)
		if err != nil {
			log.Fatalf("failed to fetch competions for event '%s': %v", event.ID, err)
		}
		for _, comp := range competitions {
			fmt.Printf("%v\n", comp)
			race, err := fetchRace(comp.RaceID)
			if err != nil {
				log.Fatalf("failed to fetch race information for race id '%s': %v", comp.RaceID, err)
			}
			log.Printf("%v\n", race)
		}
	}
}
