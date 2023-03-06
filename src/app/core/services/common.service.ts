import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NbaGame, NbaGameApiResult, NbaTeam, NbaTeamApiResult } from 'src/app/shared/models/nba.model';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    url = 'https://free-nba.p.rapidapi.com/';

    constructor(private _http: HttpClient) {}

    getTeams(): Observable<NbaTeam[]> {
        const httpOption = this.#setOptions();
        return this._http.get<NbaTeamApiResult>(this.url + 'teams', httpOption).pipe(map(value => value.data));
    }

    getGames(teamId: number): Observable<NbaGame[]> {
        const httpOption = this.#setOptions();
        let url = this.url + 'games?';

        // Get current date
        let t = new Date();
        // Create UTC date for daysAgo
        let d = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - 12));

        for(var arr=[],dt=new Date(d); dt<=new Date(t); dt.setDate(dt.getDate()+1)){
            arr.push('dates[]=' + new Date(dt).toISOString().split('T')[0]);
        }

        url += arr.join('&') + '&team_ids[]=' + teamId;

        return this._http.get<NbaGameApiResult>(url, httpOption).pipe(map(value => value.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
    }

    #setOptions(contentType = 'application/json') {
        const option = {
            headers: new HttpHeaders({
                'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }),
        };
        if (contentType) {
            option.headers = option.headers.set('Content-Type', contentType);
        }

        return option;
    }
}
