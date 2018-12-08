package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

// responsible for event fetching from the IBU API
//
// converts the events in IBU format into an internal representation
// SourceEvent -> Event

func getEventsURL(season string) string {
	return fmt.Sprintf("https://biathlonresults.com/modules/sportapi/api/Events?SeasonId=%s", season)
}

// Event represents an IBU Event
type Event struct {
	ID        string
	Name      string
	Level     uint8
	Country   string
	Organizer string
	Season    string
	StartTime time.Time
	EndTime   time.Time
	UTCOffset int8
}

// String implements Stringer interface
func (e Event) String() string {
	return fmt.Sprintf("Event {id = %s name = %s level = %d country = %s "+
		"organizer = %s season = %s startTime = %v endTime = %v UTCOffset = %d }",
		e.ID, e.Name, e.Level, e.Country, e.Organizer, e.Season, e.StartTime, e.EndTime, e.UTCOffset)
}

// SourceEvent is an event received from the IBU API
type SourceEvent struct {
	Description           string
	EndDate               time.Time
	EventClassificationID string `json:"EventClassificationId"`
	EventID               string `json:"EventId"`
	IsActual              bool
	IsCurrent             bool
	Level                 uint8
	MedalSetID            string `json:"MedalSetId"`
	Nat                   string
	Organizer             string
	SeasonID              string `json:"SeasonId"`
	ShortDescription      string
	StartDate             time.Time
	UTCOffset             int8
}

func fetchEvents(season string) ([]*Event, error) {
	URL := getEventsURL(season)

	log.Printf("about to fetch all events for season '%s' from: %s", season, URL)
	resp, err := http.Get(URL)
	if err != nil {
		log.Printf("failed to fetch events: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("failed to read response's body: %v", err)
		return nil, err
	}

	var sourceEvents []SourceEvent
	err = json.Unmarshal(body, &sourceEvents)
	if err != nil {
		log.Printf("failed to unmarshal: %v", err)
		return nil, err
	}

	var events = make([]*Event, len(sourceEvents))
	// transform to events
	for i, sourceEvent := range sourceEvents {
		event := Event{
			ID:        sourceEvent.EventID,
			Name:      sourceEvent.Description,
			Level:     sourceEvent.Level,
			Country:   sourceEvent.Nat,
			Organizer: sourceEvent.Organizer,
			Season:    sourceEvent.SeasonID,
			StartTime: sourceEvent.StartDate,
			EndTime:   sourceEvent.EndDate,
			UTCOffset: sourceEvent.UTCOffset,
		}
		events[i] = &event
	}

	return events, nil
}
