import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '../../model/property.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-property-card',
  imports: [CurrencyPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCard {

  @Input() info!: Property;
  @Input() num!: string;

  @Output() detail = new EventEmitter<number>();

  onClickDetails(){
    this.detail.emit(this.info.id);
  }
}
