import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbaService } from 'src/app/core/services/nba.service';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() team!: NbaTeam;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  games!: NbaGame[];

  ptsScored: number = 0;
  ptsConceded: number = 0;

  constructor(private nbaService: NbaService, private router: Router) { }

  ngOnInit(): void {
    // Get all the games of the team
    this.nbaService.getGames(this.team.id).subscribe((games: NbaGame[]) => {
      this.games = games;

      // Calc average points scored and conceded
      this.ptsScored = this.games.reduce((partialSum: number, game: NbaGame) => {
        return partialSum + (game.home_team.id === this.team.id ? game.home_team_score : game.visitor_team_score)
      }, 0) / this.games.length;
      this.ptsConceded = this.games.reduce((partialSum: number, game: NbaGame) => {
        return partialSum + (game.home_team.id === this.team.id ? game.visitor_team_score : game.home_team_score)
      }, 0) / this.games.length;
    });
  }

  goToResults() {
    this.router.navigate(['results/' + this.team.abbreviation])
  }

}
