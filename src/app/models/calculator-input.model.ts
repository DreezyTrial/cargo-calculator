export interface CalculatorInput {
  vehicleId: string;
  durationHours: number;
  moversCount: number;
  hasLiftFrom: boolean;
  hasLiftTo: boolean;
  floorsFrom: number;
  floorsTo: number;
  needPacking: boolean;
  needAssembly: boolean;
  isHeavyItem: boolean;
}

export interface PriceBreakdown {
  vehicle: number;
  movers: number;
  extras: number;
  total: number;
}
