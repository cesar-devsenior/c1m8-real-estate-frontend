import { Component } from '@angular/core';
import { PropertyList } from "./features/properties/components/property-list/property-list";

@Component({
  selector: 'app-root',
  imports: [PropertyList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Cesar\'s Real Estate';
}
