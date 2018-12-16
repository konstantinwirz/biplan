package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

// responsible for competition fetching from the IBU API
//
// converts the competitions from IBU format into an internal representation
// SourceCompetition -> Competition

// SourceCompetition is a competition received from the IBU API
type SourceCompetition struct {
	Description      string
	DisciplineID     string `json:"DisciplineId"`
	HasAnalysis      bool
	HasLiveData      bool
	IsLive           bool
	RaceID           string `json:"RaceId"`
	ResultsCredit    string
	ShortDescription string
	StartTime        time.Time
	StatusID         int16 `json:"StatusId"`
	StatusText       string
	TimingCredit     string
	CatID            string `json:"catId"`
	KM               string `json:"km"`
}

// Competition is an internal representation
// of an IBU competition
type Competition struct {
	Name      string    `json:"name"`
	RaceID    string    `json:"raceId"`
	StartTime time.Time `json:"startTime"`
	Distance  string    `json:"distance"`
	Completed bool      `json:"completed"`
}

// String implements Stringer interface
func (c Competition) String() string {
	return fmt.Sprintf("Competition {name = %s raceId = %s startTime = %v distance = %s completed = %v}",
		c.Name, c.RaceID, c.StartTime, c.Distance, c.Completed)
}

func getCompetitionsURL(eventID string) string {
	return fmt.Sprintf("https://biathlonresults.com/modules/sportapi/api/Competitions?EventId=%s", eventID)
}

func fetchCompetitions(eventID string) ([]*Competition, error) {
	URL := getCompetitionsURL(eventID)

	log.Printf("about to fetch all competitions for event '%s' from: %s", eventID, URL)
	resp, err := http.Get(URL)
	if err != nil {
		log.Printf("failed to fetch competitions: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("failed to read response's body: %v", err)
		return nil, err
	}

	var sourceCompetitions []SourceCompetition
	err = json.Unmarshal(body, &sourceCompetitions)
	if err != nil {
		log.Printf("failed to unmarshal competitions: %v", err)
		return nil, err
	}

	var competitions = make([]*Competition, len(sourceCompetitions))
	// transform competitions
	for i, src := range sourceCompetitions {
		competitions[i] = &Competition{
			Name:      src.Description,
			RaceID:    src.RaceID,
			StartTime: src.StartTime,
			Distance:  src.KM,
			Completed: src.StatusID == 11,
		}
	}

	return competitions, nil
}
