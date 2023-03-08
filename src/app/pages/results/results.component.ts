import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NbaService } from 'src/app/core/services/nba.service';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  #destroy$ = new Subject<void>();

  team!: NbaTeam;
  games$!: Observable<NbaGame[]>;

  constructor(private nbaService: NbaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.#destroy$)).subscribe(params => {
      this.team = this.nbaService.teams.find((team: NbaTeam) => team.abbreviation === params['teamCode']) as NbaTeam;
      // If the team is already in the service array, get only the games
      if (this.team) {
        this.games$ = this.nbaService.getGames(this.team.id);
      }
      // If the team is not in the service array (access to the results page directly by url), get the teams and the games
      else {
        this.nbaService.getTeams().pipe(takeUntil(this.#destroy$)).subscribe((values: NbaTeam[]) => {
          this.nbaService.teams = values;
          this.team = this.nbaService.teams.find((team: NbaTeam) => team.abbreviation === params['teamCode']) as NbaTeam;
          this.games$ = this.nbaService.getGames(this.team.id);
        });
      }
    });
  }

  /**
   * Navigate to the home page
   */
  goToHome() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
