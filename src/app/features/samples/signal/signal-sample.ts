import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal-sample',
  imports: [],
  // Inline template
  template: `
    <h1>Signal Counter</h1>
    <p>Counter: {{ count() }}</p>
    <button (click)="increment()">Incrementar</button>
    <p>{{ message() }}</p>
  `,
})
export class SignalSample {
  protected count = signal<number>(0);
  protected message = computed(
    () => `Has dado ${this.count()} click sobre el boton`
  );

  constructor() {
    effect(() => {
        console.log('El contador es:', this.count());
    
        console.log('Mensaje:', this.message());
      });
  }

  increment() {
    this.count.update((value) => value + 1);
    // this.message = `Has dado ${ this.count() } click sobre el boton`;
  }
}
