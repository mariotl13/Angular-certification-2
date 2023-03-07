import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbaTeam } from '../../models/nba.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() team!: NbaTeam;
  @Input() showClose?: boolean = true;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor() { }

}
