import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail.component';
import { CardComponent } from './components/card/card.component';
import { DetailRoutingModule } from './detail-routing.module';



@NgModule({
  declarations: [DetailComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
