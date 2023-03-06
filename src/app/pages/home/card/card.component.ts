import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaGame, NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() team!: NbaTeam;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  $games!: Observable<NbaGame[]>;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.$games = this.commonService.getGames(this.team.id);
  }

  goToResults() {
    // TODO: Pasarle aqui la info del games que ya hemos obtenido para no hacer la llamada dos veces???
    this.router.navigate(['results/' + this.team.abbreviation])
  }

}
