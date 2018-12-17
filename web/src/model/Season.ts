
// Represents a biathlon season
export interface Season {
    id: string
    displayName: string
}

// all available seasons
export const availableSeasons: Season[] = allSeasons();

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

function allSeasons(): Season[] {
    const MAX_YEAR = new Date().getFullYear() - 2000;
    const MIN_YEAR = 10;

    let seasons: Season[] = []
    for (let i = MIN_YEAR; i <= MAX_YEAR; ++i) {
        seasons.push({
            id: `${i}${i+1}`,
            displayName: `20${i}/20${i+1}`
        })
    }

    return seasons;
}

export const initialSeason = availableSeasons[0];

