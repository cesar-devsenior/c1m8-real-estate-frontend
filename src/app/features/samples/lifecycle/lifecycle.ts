import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-lifecycle',
    template: `<p>Lifecycle works</p>`
})
export class Lifecycle implements OnInit, OnChanges {
    @Input() name: string = '';

    constructor() {
        console.log("Creando el componente");
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("Recibiendo cambios en los parámetros");       
    }

    ngOnInit(): void {
        console.log("Inicializando el componente");
        console.log("El parámetro es:", this.name);
    }
}