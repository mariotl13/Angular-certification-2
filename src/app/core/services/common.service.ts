import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NbaTeam, NbaTeamApiResult } from 'src/app/shared/models/nba.model';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    url = 'https://free-nba.p.rapidapi.com/teams';

    constructor(private _http: HttpClient) {}

    // getAll<T>(url: string, responseType?: string): Observable<T> {
    //     const httpOption = this.setOptions('application/json');
    //     if (responseType) {
    //         httpOption['responseType'] = responseType;
    //     }
    //     return this._http.get<T>(AppSettings.settings.apiUrl + url, httpOption);
    // }

    getTeams(): Observable<NbaTeam[]> {
        const httpOption = this.#setOptions();
        return this._http.get<NbaTeamApiResult>(this.url, httpOption).pipe(map(value => value.data));
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
