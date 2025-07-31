import { Injectable, signal } from '@angular/core';
import { Property } from '../model/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private properties = signal<Property[]>([
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
      description: 'Exclusivo ático con piscina privada y acabados de lujo.',
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
    {
      id: 6,
      address: 'Gran Vía 12',
      city: 'Madrid',
      price: 410000,
      bedrooms: 2,
      bathrooms: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      description:
        'Apartamento moderno en pleno centro, ideal para parejas o profesionales.',
    },
    {
      id: 7,
      address: 'Rua das Flores 33',
      city: 'Sevilla',
      price: 270000,
      bedrooms: 3,
      bathrooms: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description:
        'Bonita vivienda en el casco antiguo, cerca de monumentos y restaurantes.',
    },
    {
      id: 8,
      address: 'Avenida de América 200',
      city: 'Valencia',
      price: 350000,
      bedrooms: 4,
      bathrooms: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
      description:
        'Piso familiar con amplias habitaciones y zonas verdes cercanas.',
    },
    {
      id: 9,
      address: 'Calle Mayor 15',
      city: 'Bilbao',
      price: 295000,
      bedrooms: 2,
      bathrooms: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80',
      description:
        'Vivienda céntrica con excelentes vistas y acabados modernos.',
    },
    {
      id: 10,
      address: 'Camino del Río 8',
      city: 'Granada',
      price: 230000,
      bedrooms: 3,
      bathrooms: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
      description:
        'Casa acogedora cerca de la Alhambra, perfecta para familias o alquiler turístico.',
    },
  ]);

  constructor() {}

  getAllProperties(): Promise<Property[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.properties());
        // reject("No hay datos disponibles");
      }, 1500);
    });
  }

  getProperty(id: number): Promise<Property> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const property = this.properties().filter((p) => p.id == id);

        if (property.length == 0) {
          reject('No se ha encontrado la propiedad con id ' + id);
        } else {
          resolve(property[0]);
        }
      }, 500);
    });
  }

  addNewProperty(property: Property): void {
    // generar el id y agregarlo a la lista de elemntos
    const newId =  Math.max(...this.properties().map(p => p.id)) + 1;
    const propertyToAdd : Property = {...property, id: newId};
    // this.properties.update(data => [ ...data, propertyToAdd]);
    this.properties.update(data => {
      data.push(propertyToAdd);
      return data;
    });
  }

  updateProperty(id: number, property: Property): void {
    this.properties.update(data => {
      const index = data.findIndex(p => p.id === id);
      if (index > -1) {
        data[index] = property;
      }
      return data;
    });
  }

  deleteProperty(id: number): void {
    this.properties.update(data => data.filter(p => p.id !== id));
  }
}
