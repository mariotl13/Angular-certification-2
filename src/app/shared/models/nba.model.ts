
export interface NbaTeam {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}

export interface NbaTeamApiResult {
    data: NbaTeam[];
    meta: Object;
}