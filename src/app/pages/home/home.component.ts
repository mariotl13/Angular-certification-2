import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { NbaTeam } from 'src/app/shared/models/nba.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getTeams().subscribe((values: NbaTeam[]) => {
      this.commonService.teams = values;
    });
  }

  trackTeam(teamName: string) {
    if (!this.commonService.selectedTeams.some(team => team.name === teamName)) {
      const team = this.commonService.teams.find((team: NbaTeam) => team.name === teamName);
      if (team) this.commonService.selectedTeams.push(team);
    }
  }

  closeTeam(teamClose: NbaTeam) {
    this.commonService.selectedTeams = this.commonService.selectedTeams.filter(team => team !== teamClose);
  }

}
