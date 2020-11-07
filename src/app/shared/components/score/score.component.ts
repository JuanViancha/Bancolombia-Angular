import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() score:Number;

  public spaces : Array<Number> = [1,2,3,4,5];

  constructor() { }

  ngOnInit(): void {
  }

}
