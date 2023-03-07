import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  #routeSub!: Subscription;

  team!: NbaTeam;
  $games!: Observable<NbaGame[]>;

  constructor(private commonService: CommonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.#routeSub = this.route.params.subscribe(params => {
      this.team = this.commonService.teams.find((team: NbaTeam) => team.abbreviation === params['teamCode']) as NbaTeam;
      if (this.team) {
        this.$games = this.commonService.getGames(this.team.id);
      } else {
        this.commonService.getTeams().subscribe((values: NbaTeam[]) => {
          this.commonService.teams = values;
          this.team = this.commonService.teams.find((team: NbaTeam) => team.abbreviation === params['teamCode']) as NbaTeam;
          this.$games = this.commonService.getGames(this.team.id);
        });
      }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.#routeSub.unsubscribe();
  }

}
