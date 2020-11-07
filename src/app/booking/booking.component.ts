import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public id: string;
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  }

  private getParams(): void {
    this.route.params.subscribe(params => {
     this.id = params._id;
    });
  }

}
