package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func eventHandler(w http.ResponseWriter, r *http.Request) {
	season := mux.Vars(r)["season"]
	events, err := fetchEvents(season)
	if err != nil {
		writeError(w, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(mustMarshal(events))
}

func writeError(w http.ResponseWriter, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(500)
	payload := map[string]string{"error": msg}
	w.Write(mustMarshal(payload))
}

func mustMarshal(v interface{}) []byte {
	b, err := json.Marshal(v)
	if err != nil {
		panic("unable to marshal")
	}
	return b
}

func competitionHandler(w http.ResponseWriter, r *http.Request) {
	eventID := mux.Vars(r)["id"]
	competitions, err := fetchCompetitions(eventID)
	if err != nil {
		writeError(w, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(mustMarshal(competitions))
}

func raceHandler(w http.ResponseWriter, r *http.Request) {
	raceID := mux.Vars(r)["id"]
	races, err := fetchRace(raceID)
	if err != nil {
		writeError(w, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(mustMarshal(races))
}

func athleteHandler(w http.ResponseWriter, r *http.Request) {
	athleteID := mux.Vars(r)["id"]
	athlete, err := fetchAthlete(athleteID)
	if err != nil {
		writeError(w, err.Error())
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(mustMarshal(athlete))
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/v1/events/{season}", eventHandler).Methods("GET")
	r.HandleFunc("/v1/competitions/{id}", competitionHandler).Methods("GET")
	r.HandleFunc("/v1/races/{id}", raceHandler).Methods("GET")
	r.HandleFunc("/v1/athletes/{id}", athleteHandler).Methods("GET")
	http.Handle("/", r)
	if err := http.ListenAndServe(":8080", handlers.CORS()(r)); err != nil {
		log.Fatalf("failed to start a http server: %v", err)
	}
}
