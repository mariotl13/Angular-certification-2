
// Result of the api call
export interface NbaTeamApiResult {
    data: NbaTeam[];
    meta: Object;
}
export interface NbaTeam {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}

// Result of the api call
export interface NbaGameApiResult {
    data: NbaGame[];
    meta: Object;
}
export interface NbaGame {
    id: number;
    date: Date;
    home_team: NbaTeam;
    home_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: NbaTeam;
    visitor_team_score: number;
}
