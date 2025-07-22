import { Component, input, output } from '@angular/core';
import { Property } from '../../model/property.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-property-card',
  imports: [CurrencyPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCard {

  info = input.required<Property>() ;
  
  num = input<number>(1);

  detail = output<number>();

  onClickDetails(){
    this.detail.emit(this.info().id);
  }
}
