import { Component, OnInit } from '@angular/core';
import { NbaService } from 'src/app/core/services/nba.service';
import { NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public nbaService: NbaService) { }

  ngOnInit(): void {
    this.nbaService.getTeams().subscribe((values: NbaTeam[]) => {
      this.nbaService.teams = values;
    });
  }

  trackTeam(teamName: string) {
    if (!this.nbaService.selectedTeams.some(team => team.name === teamName)) {
      const team = this.nbaService.teams.find((team: NbaTeam) => team.name === teamName);
      if (team) this.nbaService.selectedTeams.push(team);
    }
  }

  closeTeam(teamClose: NbaTeam) {
    this.nbaService.selectedTeams = this.nbaService.selectedTeams.filter(team => team !== teamClose);
  }

}
