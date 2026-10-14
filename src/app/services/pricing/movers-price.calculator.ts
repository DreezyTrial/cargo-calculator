import { Injectable } from '@angular/core';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorInput } from '../../models/calculator-input.model';
import { PriceCalculator } from './price-calculator.interface';

@Injectable({ providedIn: 'root' })
export class MoversPriceCalculator implements PriceCalculator {
  calculate(input: CalculatorInput): number {
    const count = input.moversCount;
    if (count === 0) {
      return 0;
    }

    const { ratePerHourPerMover, minHours, floorSurchargePerFloorPerMover } = PRICING.movers;
    const hours = Math.max(input.durationHours, minHours);
    let total = count * hours * ratePerHourPerMover;

    if (!input.hasLiftFrom && input.floorsFrom > 1) {
      total += (input.floorsFrom - 1) * floorSurchargePerFloorPerMover * count;
    }
    if (!input.hasLiftTo && input.floorsTo > 1) {
      total += (input.floorsTo - 1) * floorSurchargePerFloorPerMover * count;
    }

    return total;
  }
}
