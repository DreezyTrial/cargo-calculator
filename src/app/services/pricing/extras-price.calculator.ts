import { Injectable } from '@angular/core';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorInput } from '../../models/calculator-input.model';
import { PriceCalculator } from './price-calculator.interface';

@Injectable({ providedIn: 'root' })
export class ExtrasPriceCalculator implements PriceCalculator {
  calculate(input: CalculatorInput): number {
    let total = 0;
    if (input.needPacking) total += PRICING.extras.packing;
    if (input.needAssembly) total += PRICING.extras.assembly;
    if (input.isHeavyItem) total += PRICING.extras.heavyItem;
    return total;
  }
}
