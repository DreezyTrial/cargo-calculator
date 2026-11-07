import { Injectable } from '@angular/core';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorInput } from '../../models/calculator-input.model';
import { PriceCalculator } from './price-calculator.interface';

export function moverHourlyRate(
  input: Pick<CalculatorInput, 'hasLiftFrom' | 'hasLiftTo' | 'floorsFrom' | 'floorsTo'>,
): number {
  const { ratePerHourPerMover, raisedRatePerHourPerMover, raisedRateMinFloor, raisedRateMaxFloor } =
    PRICING.movers;
  const floor = Math.max(input.hasLiftFrom ? 1 : input.floorsFrom, input.hasLiftTo ? 1 : input.floorsTo);

  if (floor >= raisedRateMinFloor && floor <= raisedRateMaxFloor) {
    return raisedRatePerHourPerMover;
  }

  return ratePerHourPerMover;
}

@Injectable({ providedIn: 'root' })
export class MoversPriceCalculator implements PriceCalculator {
  calculate(input: CalculatorInput): number {
    const count = input.moversCount;
    if (count === 0) {
      return 0;
    }

    const { minHours, floorSurchargePerFloorPerMover } = PRICING.movers;
    const hours = Math.max(input.durationHours, minHours);
    let total = count * hours * moverHourlyRate(input);

    if (!input.hasLiftFrom && input.floorsFrom > 1) {
      total += (input.floorsFrom - 1) * floorSurchargePerFloorPerMover * count;
    }
    if (!input.hasLiftTo && input.floorsTo > 1) {
      total += (input.floorsTo - 1) * floorSurchargePerFloorPerMover * count;
    }

    return total;
  }
}
