import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() team!: NbaTeam;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  $games!: Observable<NbaGame[]>;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.$games = this.commonService.getGames(this.team.id);
  }

  goToResults() {
    this.router.navigate(['results/' + this.team.abbreviation])
  }

}
