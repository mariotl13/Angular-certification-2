import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Directive({
  selector: '[appGameResult]'
})
export class GameResultDirective implements OnInit {

  @Input() appGameResult!: NbaGame;
  @Input() appTeam!: NbaTeam;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    let win: boolean;

    // Check if the team win or lose
    if (this.appTeam.id === this.appGameResult.home_team.id) win = this.appGameResult.home_team_score > this.appGameResult.visitor_team_score;
    else win = this.appGameResult.visitor_team_score > this.appGameResult.home_team_score;

    if (win) {
      this.el.nativeElement.style.backgroundColor = 'green';
      this.el.nativeElement.innerHTML = 'W';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
      this.el.nativeElement.innerHTML = 'L';
    }
  }

}
