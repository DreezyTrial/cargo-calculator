import { Component, inject } from '@angular/core';
import { VEHICLES } from '../../data/vehicles.data';
import { CalculatorStateService } from '../../services/calculator-state.service';

@Component({
  selector: 'app-vehicle-selector',
  standalone: true,
  templateUrl: './vehicle-selector.component.html',
  styleUrl: './vehicle-selector.component.scss',
})
export class VehicleSelectorComponent {
  readonly vehicles = VEHICLES;
  readonly state = inject(CalculatorStateService);

  selectVehicle(id: string): void {
    this.state.selectVehicle(id);
  }
}
