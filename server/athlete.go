package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// responsible for athletes fetching from the IBU API
//
// converts an athlete from IBU format into an internal representation
// SourceAthlete -> Athlete

// SourceAthlete is a competition received from the IBU API
type SourceAthlete struct {
	IBUId            string
	FullName         string
	FamilyName       string
	GivenName        string
	otherFamilyNames string
	otherGivenNames  string
	NAT              string
	NF               string
	Birthdate        string
	BirthYear        int
	Age              uint8
	GenderID         string `json:"GenderId"`
	Functions        string
	PhotoURI         string
	FlagURI          string
}

// Athlete is an IBU athlete
type Athlete struct {
	ID       string `json:"id"`
	FullName string `json:"fullName"`
	Country  string `json:"country"`
	Age      uint8  `json:"age"`
	Gender   string `json:"gender"`
	PhotoURI string `json:"photoUri"`
	FlagURI  string `json:"flagUri"`
}

func (a Athlete) String() string {
	return fmt.Sprintf("Athlete { id = %s fullName = %s country = %s age = %d gender = %s photoURI = %s flagURI = %s }",
		a.ID, a.FullName, a.Country, a.Age, a.Gender, a.PhotoURI, a.FlagURI)
}

func getAthleteURL(ID string) string {
	return fmt.Sprintf("https://biathlonresults.com/modules/sportapi/api/CISBios?IBUId=%s", ID)
}

func fetchAthlete(ID string) (*Athlete, error) {
	URL := getAthleteURL(ID)

	log.Printf("about to fetch athlete information fro the id %s from: %s", ID, URL)

	resp, err := http.Get(URL)
	if err != nil {
		log.Printf("failed to fetch athlete: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("failed to read response's body: %v", err)
		return nil, err
	}

	var srcAthlete SourceAthlete
	err = json.Unmarshal(body, &srcAthlete)
	if err != nil {
		log.Printf("failed to unmarshal athlete: %v", err)
		return nil, err
	}

	return &Athlete{
		ID:       srcAthlete.IBUId,
		FullName: srcAthlete.FullName,
		Country:  srcAthlete.NAT,
		Age:      srcAthlete.Age,
		Gender:   srcAthlete.GenderID,
		PhotoURI: srcAthlete.PhotoURI,
		FlagURI:  srcAthlete.FlagURI,
	}, nil

}
