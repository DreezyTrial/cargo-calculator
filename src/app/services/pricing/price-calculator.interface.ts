import { CalculatorInput } from '../../models/calculator-input.model';

export interface PriceCalculator {
  calculate(input: CalculatorInput): number;
}
