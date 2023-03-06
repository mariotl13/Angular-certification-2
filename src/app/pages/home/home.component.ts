import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  teams: NbaTeam[] = [];
  selectedTeams: NbaTeam[] = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getTeams().subscribe((values: NbaTeam[]) => {
      this.teams = values;
    });
  }

  trackTeam(teamName: string) {
    if (!this.selectedTeams.some(team => team.name === teamName)) {
      const team = this.teams.find((team: NbaTeam) => team.name === teamName);
      if (team) this.selectedTeams.push(team);
    }
  }

  closeTeam(teamClose: NbaTeam) {
    this.selectedTeams = this.selectedTeams.filter(team => team !== teamClose);
  }

}
