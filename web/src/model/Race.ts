
export interface Race {
    id: string
    completed: boolean
    results: RaceResult[]
}

export interface RaceResult {
    startOrder: number
    resultOrder: number
    athleteId: string
    name: string
    shortName: string
    country: string
    rank: string
    shootings: string
    shootingTotal: string
    runTime: string
    totalTime: string
    startTime: string
    behind: string
    result: string
}