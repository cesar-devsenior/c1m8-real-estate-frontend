import { Component, effect, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property';

@Component({
  selector: 'app-property-form',
  imports: [ReactiveFormsModule],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
})
export class PropertyForm {
  propertyId = input<string | undefined>();
  loading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);
  isEditMode = signal<boolean>(false);

  propertyForm = new FormGroup({
    id: new FormControl<number | null>(null),
    address: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required),
    price: new FormControl<number | null>(0, [
      Validators.required,
      Validators.min(1000),
    ]),
    bedrooms: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
    bathrooms: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    imageUrl: new FormControl<String>('', [
      Validators.required,
      Validators.pattern(/^(http|https):\/\/[^ "]+$/), // Regex - Expresion Regular
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  constructor(private router: Router, private service: PropertyService) {
    effect(() => {
      if (this.propertyId()) {
        this.isEditMode.set(true);
        this.loading.set(true);
        this.error.set(undefined);
        const id = parseInt(this.propertyId() ?? '0');

        this.service.getProperty(id)
        .subscribe({
          next: (data) => {
            this.propertyForm.patchValue(data);
            this.loading.set(false);
          },
          error: (error) => {
            this.error.set(error.error.message);
            this.loading.set(false);
          }
        });
      } else {
        this.isEditMode.set(false);
        this.loading.set(false);
      }
    });
  }

  onSave() {
    // Validar que los campos obligatorios esten llenos
    if (this.propertyForm.invalid) {
      console.warn('Formulario inválido. No se puede enviar');
      return;
    }

    // Crear un objeto con los datos suministrados
    const newProperty: Property = this.propertyForm.value as Property;

    // Enviar a guardar al servicio de propiedades
    this.service.addNewProperty(newProperty).subscribe({
      next: (data) => {
        alert("Nueva propiedad creada");
        this.goBack();
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  onUpdate() {
    const id = parseInt(this.propertyId()!);
    const property: Property = this.propertyForm.value as Property;

    this.service.updateProperty(id, property);
    alert("Propiedad Actualizada correctamente");
    this.goBack();

  }

  goBack() {
    if (this.isEditMode()) {
      this.router.navigate(['properties', this.propertyId()]);
    } else {
      this.router.navigateByUrl('properties');
    }
  }
}
