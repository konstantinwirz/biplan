
// Represents a biathlon season
export default interface Season {
    id: string
    displayName: string
}

// all available seasons
export const availableSeasons: Season[] = [
    { id: "1819", displayName: "2018/2019" },
    { id: "1718", displayName: "2017/2018" },
    { id: "1617", displayName: "2016/2017" },
];
