import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NbaService } from 'src/app/core/services/nba.service';
import { NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  #destroy$ = new Subject<void>();

  constructor(public nbaService: NbaService) { }

  ngOnInit(): void {
    this.nbaService.getTeams().pipe(takeUntil(this.#destroy$)).subscribe((values: NbaTeam[]) => {
      this.nbaService.teams = values;
    });
  }

  /**
   * If the team is not already selected, add it to the selected teams array in the service
   * @param {string} teamName - Name of a team
   */
  trackTeam(teamName: string) {
    if (!this.nbaService.selectedTeams.some(team => team.name === teamName)) {
      const team = this.nbaService.teams.find((team: NbaTeam) => team.name === teamName);
      if (team) this.nbaService.selectedTeams.push(team);
    }
  }

  /**
   * Removes a team from the selected teams array in the service
   * @param {NbaTeam} teamClose - Name of a team
   */
  closeTeam(teamClose: NbaTeam) {
    this.nbaService.selectedTeams = this.nbaService.selectedTeams.filter(team => team !== teamClose);
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
