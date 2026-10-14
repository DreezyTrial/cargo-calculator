export interface CalculatorInput {
  vehicleId: string;
  durationHours: number;
  moversCount: number;
  hasLiftFrom: boolean;
  hasLiftTo: boolean;
  floorsFrom: number;
  floorsTo: number;
}

export interface PriceBreakdown {
  vehicle: number;
  movers: number;
  total: number;
}
