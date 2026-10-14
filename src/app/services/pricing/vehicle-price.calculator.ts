import { Injectable } from '@angular/core';
import { VEHICLES } from '../../data/vehicles.data';
import { CalculatorInput } from '../../models/calculator-input.model';
import { PriceCalculator } from './price-calculator.interface';

@Injectable({ providedIn: 'root' })
export class VehiclePriceCalculator implements PriceCalculator {
  calculate(input: CalculatorInput): number {
    const vehicle = VEHICLES.find((v) => v.id === input.vehicleId) ?? VEHICLES[0];
    const hours = input.durationHours;

    if (hours <= vehicle.minHours) {
      return vehicle.basePrice;
    }

    return vehicle.basePrice + (hours - vehicle.minHours) * vehicle.extraHourPrice;
  }
}
