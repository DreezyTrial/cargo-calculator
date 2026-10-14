import { Component } from '@angular/core';
import { CargoCalculatorComponent } from './components/cargo-calculator/cargo-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CargoCalculatorComponent],
  template: `<cargo-calculator />`,
})
export class App {}
