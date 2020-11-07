import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { IExperience } from 'src/app/shared/models/experience.model';
import { IExperienceTop5Response } from 'src/app/shared/models/top5Response.model';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public top5: Array<IExperience>;

  constructor( private experienceService: ExperienceService) { }

  ngOnInit(): void {
    this.getTop5();
  }

  private getTop5():void{
  this.experienceService.getTop5().subscribe(response =>{
    console.log('respuesta', response);
      this.top5 = response.top5;
  });
}
}
