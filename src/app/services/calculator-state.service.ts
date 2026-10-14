import { Injectable, computed, signal } from '@angular/core';
import { VEHICLES } from '../data/vehicles.data';
import { CalculatorInput } from '../models/calculator-input.model';
import { VehicleOption } from '../models/vehicle.model';
import { formatUkDate, toIsoDate } from '../utils/date.util';
import { CargoPricingService } from './pricing/cargo-pricing.service';

@Injectable({ providedIn: 'root' })
export class CalculatorStateService {
  readonly selectedVehicleId = signal<string>('bus');
  readonly durationHours = signal<number>(2);
  readonly moversCount = signal<number>(2);
  readonly hasLiftFrom = signal<boolean>(false);
  readonly hasLiftTo = signal<boolean>(false);
  readonly floorsFrom = signal<number>(1);
  readonly floorsTo = signal<number>(1);
  readonly orderDate = signal<string>(toIsoDate());
  readonly extraServicesNote = signal<string>('');

  readonly minOrderDate = toIsoDate();
  readonly formattedOrderDate = computed(() => formatUkDate(this.orderDate()));

  readonly selectedVehicle = computed((): VehicleOption => {
    return VEHICLES.find((v) => v.id === this.selectedVehicleId()) ?? VEHICLES[0];
  });

  private readonly input = computed((): CalculatorInput => ({
    vehicleId: this.selectedVehicleId(),
    durationHours: this.durationHours(),
    moversCount: this.moversCount(),
    hasLiftFrom: this.hasLiftFrom(),
    hasLiftTo: this.hasLiftTo(),
    floorsFrom: this.floorsFrom(),
    floorsTo: this.floorsTo(),
  }));

  readonly priceBreakdown = computed(() => this.pricing.breakdown(this.input()));

  constructor(private readonly pricing: CargoPricingService) {}

  selectVehicle(id: string): void {
    this.selectedVehicleId.set(id);
    const vehicle = this.selectedVehicle();
    if (this.durationHours() < vehicle.minHours) {
      this.durationHours.set(vehicle.minHours);
    }
  }
}
