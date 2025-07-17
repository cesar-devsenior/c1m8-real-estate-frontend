import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Property } from '../../model/property.model';
import { PropertyCard } from '../property-card/property-card';

@Component({
  selector: 'app-property-list',
  imports: [PropertyCard, FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList {
  allProperties: Property[] = [];
  properties: Property[] = [];
  loading: boolean = false;
  error: string | null = null;

  filterCity: string = '';

  constructor() {
    this.loadProperties();
  }

  showDetail(id: number) {
    alert('Han seleccionado la propiedad: ' + id);
  }

  searchProperties() {
    if (!this.filterCity) {
      this.properties = this.allProperties;
    } else {
      this.properties = this.allProperties.filter((p) =>
        p.city.toLowerCase().includes(this.filterCity.toLowerCase())
      );
    }
  }

  private loadProperties(): void {
    this.loading = true;
    this.error = null;

    setTimeout(() => {
      this.allProperties = [
        {
          id: 1,
          address: 'Calle Mayor 123',
          city: 'Madrid',
          price: 350000,
          bedrooms: 3,
          bathrooms: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          description:
            'Luminoso piso en el centro de Madrid, cerca de todos los servicios.',
        },
        {
          id: 2,
          address: 'Avenida Diagonal 456',
          city: 'Barcelona',
          price: 475000,
          bedrooms: 4,
          bathrooms: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
          description:
            'Amplio apartamento con terraza y vistas a la ciudad en Barcelona.',
        },
        {
          id: 3,
          address: 'Calle Larios 78',
          city: 'Málaga',
          price: 290000,
          bedrooms: 2,
          bathrooms: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
          description:
            'Acogedor piso cerca de la playa, ideal para vacaciones o inversión.',
        },
        {
          id: 4,
          address: 'Paseo de la Castellana 101',
          city: 'Madrid',
          price: 650000,
          bedrooms: 5,
          bathrooms: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
          description:
            'Exclusivo ático con piscina privada y acabados de lujo.',
        },
        {
          id: 5,
          address: 'Carrer de Balmes 22',
          city: 'Barcelona',
          price: 320000,
          bedrooms: 3,
          bathrooms: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
          description:
            'Piso reformado en el Eixample, muy bien comunicado y con mucha luz natural.',
        },
      ];

      this.properties = this.allProperties;
      this.loading = false;
    }, 1500);
  }
}
