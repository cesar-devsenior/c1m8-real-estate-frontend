import { Component, effect, input, OnInit, signal } from '@angular/core';
import { Property } from '../../model/property.model';
import { CurrencyPipe } from '@angular/common';
import { PropertyService } from '../../service/property';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css',
})
export class PropertyDetail {
  propertyId = input<string | undefined>();

  loading = signal<boolean>(true);
  error = signal<String | undefined>(undefined);
  propertyDetail = signal<Property | undefined>(undefined);

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {
    effect(() => {
      const id = this.propertyId();
      if (id) {
        const idNum = parseInt(id);
        if (!isNaN(idNum)) {
          // NaN = Not a Number
          // Cargar el detalle de la propiedad
          this.getPropertyDetail(idNum);
        } else {
          this.error.set('ID de propiedad inválida');
          this.loading.set(false);
        }
      } else {
        this.error.set('ID de propiedad no fue dado');
        this.loading.set(false);
      }
    });
  }

  private getPropertyDetail(id: number) {
    this.propertyDetail.set(undefined);
    this.error.set(undefined);
    this.loading.set(true);

    this.propertyService
      .getProperty(id)
      .then((p) => {
        this.propertyDetail.set(p);
        this.loading.set(false);
      })
      .catch((error) => {
        this.error.set(error);
        this.loading.set(false);
      });
  }

  goBack(): void {
    // TODO: Crear el código
    this.router.navigateByUrl("/properties");
  }

  onDelete() {
    this.propertyService.deleteProperty(parseInt(this.propertyId()!));
    alert("Propiedad eliminada correctamente");
    this.goBack();
  }
}
