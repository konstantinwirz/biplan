package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

// responsible for fetching race information from the IBU API
//
// converts the race information from IBU format into an internal representation
// SourceRace -> Race

// SourceRace represents an IBU race
type SourceRace struct {
	RaceID      string `json:"RaceId"`
	IsStartList bool
	IsResult    bool
	Competition SourceCompetition
	SportEvt    SourceEvent
	Results     []SourceRaceResult
}

// SourceRaceResult is a single result
// in the result list
type SourceRaceResult struct {
	StartOrder           uint32
	ResultOrder          uint32
	IRM                  string
	IBUId                string
	Name                 string
	ShortName            string
	Nat                  string
	Bib                  string
	Leg                  int32
	Rank                 string
	Rnk                  string
	Shootings            string
	ShootingTotal        string
	RunTime              string
	TotalTime            string
	WC                   string
	NC                   string
	NOC                  string
	StartTime            string
	StartInfo            string
	StartRow             uint16
	StartLane            uint16
	BibColor             string
	Behind               string
	StartGroup           string
	PursuitStartDistance uint32
	Result               string
}

// Race represents a race
type Race struct {
	ID        string
	Completed bool
	Results   []*RaceResult
}

// String implements the Stringer interface
func (r Race) String() string {
	// collect results
	var results strings.Builder
	for _, result := range r.Results {
		results.WriteString(result.String())
		results.WriteString("\n")
	}
	return fmt.Sprintf("Race { id = %s completed = %v results = %v }", r.ID, r.Completed, results.String())
}

// RaceResult is result of a
// single athlete
type RaceResult struct {
	StartOrder    uint32
	ResultOrder   uint32
	AthleteID     string
	Name          string
	ShortName     string
	Country       string
	Rank          string
	Shootings     string
	ShootingTotal string
	RunTime       string
	TotalTime     string
	StartTime     string
	Behind        string
	Result        string
}

// String implements the Stringer interface
func (rr RaceResult) String() string {
	return fmt.Sprintf("RaceResult {startOrder = %d resultOrder = %d athleteId = %s name = %s shortName = %s "+
		"country = %s rank = %s shootings = %s shootingsTotal = %s runTime = %s totalTime = %s "+
		"startTime = %v behind = %s result = %s}", rr.StartOrder, rr.ResultOrder, rr.AthleteID, rr.Name, rr.ShortName,
		rr.Country, rr.Rank, rr.Shootings, rr.ShootingTotal, rr.RunTime, rr.TotalTime, rr.StartTime, rr.Behind, rr.Result)
}

func getRaceURL(raceID string) string {
	return fmt.Sprintf("https://biathlonresults.com/modules/sportapi/api/Results?RaceId=%s", raceID)
}

func fetchRace(raceID string) (*Race, error) {
	URL := getRaceURL(raceID)

	log.Printf("about to fetch race information for race id '%s' from: %s", raceID, URL)
	resp, err := http.Get(URL)
	if err != nil {
		log.Printf("failed to fetch race information: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("failed to read response's body: %v", err)
		return nil, err
	}

	var sourceRace SourceRace
	err = json.Unmarshal(body, &sourceRace)
	if err != nil {
		log.Printf("failed to unmarshal the race: %v", err)
		return nil, err
	}

	race := Race{
		ID:        sourceRace.RaceID,
		Completed: sourceRace.IsResult,
		Results:   make([]*RaceResult, len(sourceRace.Results)),
	}
	// convert results
	for i, srcResult := range sourceRace.Results {
		race.Results[i] = &RaceResult{
			StartOrder:    srcResult.StartOrder,
			ResultOrder:   srcResult.ResultOrder,
			AthleteID:     srcResult.IBUId,
			Name:          srcResult.Name,
			ShortName:     srcResult.ShortName,
			Country:       srcResult.Nat,
			Rank:          srcResult.Rank,
			Shootings:     srcResult.Shootings,
			ShootingTotal: srcResult.ShootingTotal,
			RunTime:       srcResult.RunTime,
			TotalTime:     srcResult.TotalTime,
			StartTime:     srcResult.StartTime,
			Behind:        srcResult.Behind,
			Result:        srcResult.Result,
		}
	}

	return &race, nil
}
