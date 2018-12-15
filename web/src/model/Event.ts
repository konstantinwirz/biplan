
// represents a biathlon event
export interface Event {
    id: string
    name: string
    level: number
    country: string
    organizer: string
    season: string
    startTime: Date
    endTime: Date
    utcOffset: number
}
