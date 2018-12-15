
// Represents a biathlon season
export interface Season {
    id: string
    displayName: string
}

// all available seasons
export const availableSeasons: Season[] = [
    { id: "1819", displayName: "2018/2019" },
    { id: "1718", displayName: "2017/2018" },
    { id: "1617", displayName: "2016/2017" },
];

/**
 * Returns the season for the given id
 * 
 * @param id season id
 */
export function seasonById(id: string): Season | null {
    const found = availableSeasons.filter(season => season.id === id);
    if (found.length === 0) {
        return null;
    }

    return found[0];
} 

export const initialSeason = availableSeasons[0];

