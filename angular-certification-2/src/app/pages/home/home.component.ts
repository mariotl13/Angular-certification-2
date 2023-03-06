import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // cards: any[];
  teams: NbaTeam[] = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getTeams().subscribe((values: NbaTeam[]) => {
      this.teams = values;
      console.log('vafafwef', this.teams)
    });
    // console.log('pruebaaaa', this.prueba);
  }

}
