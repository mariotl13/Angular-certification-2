import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NbaGame, NbaGameApiResult, NbaTeam, NbaTeamApiResult } from 'src/app/shared/models/nba.model';

@Injectable({
    providedIn: 'root',
})
export class NbaService {

    // API url
    #url = 'https://free-nba.p.rapidapi.com/';
    #headerOptions = {
        headers: new HttpHeaders({
            'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }),
    };

    teams: NbaTeam[] = [];
    selectedTeams: NbaTeam[] = [];

    constructor(private _http: HttpClient) {}

    /**
     * Gets all the nba teams
     * @returns {Observable<NbaTeam[]>} Observable array of nba teams.
     */
    getTeams(): Observable<NbaTeam[]> {
        return this._http.get<NbaTeamApiResult>(this.#url + 'teams', this.#headerOptions).pipe(map(value => value.data));
    }

    /**
     * Gets all the games of a team in the last 12 days
     * @param {number} teamId - Id of a team
     * @returns {Observable<NbaGame[]>} Observable array of games.
     */
    getGames(teamId: number): Observable<NbaGame[]> {
        let currentDate = new Date();
        // Date for 12 days ago
        let previousDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 12));

        // Calc array of dates (1 per day in the last 12 days)
        let datesArray = [];
        for(let dt = new Date(previousDate); dt <= new Date(currentDate); dt.setDate(dt.getDate() + 1)){
            datesArray.push('dates[]=' + new Date(dt).toISOString().split('T')[0]);
        }

        // Create url
        let url = `${this.#url}games?${datesArray.join('&')}&team_ids[]=${teamId}`;

        // Get games and sort result by dates
        return this._http.get<NbaGameApiResult>(url, this.#headerOptions).pipe(map(value => value.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
    }
}
