import { Injectable, inject } from '@angular/core';
import { CalculatorInput, PriceBreakdown } from '../../models/calculator-input.model';
import { MoversPriceCalculator } from './movers-price.calculator';
import { VehiclePriceCalculator } from './vehicle-price.calculator';

@Injectable({ providedIn: 'root' })
export class CargoPricingService {
  private readonly vehicleCalculator = inject(VehiclePriceCalculator);
  private readonly moversCalculator = inject(MoversPriceCalculator);

  breakdown(input: CalculatorInput): PriceBreakdown {
    const vehicle = this.vehicleCalculator.calculate(input);
    const movers = this.moversCalculator.calculate(input);

    return {
      vehicle,
      movers,
      total: vehicle + movers,
    };
  }
}
