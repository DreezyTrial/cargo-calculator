import { TestBed } from '@angular/core/testing';
import { PRICING } from '../../data/pricing.constants';
import { VEHICLES } from '../../data/vehicles.data';
import { CargoPricingService } from './cargo-pricing.service';

describe('CargoPricingService', () => {
  let service: CargoPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargoPricingService);
  });

  it('calculates vehicle cost at minimum hours', () => {
    const bus = VEHICLES.find((v) => v.id === 'bus')!;
    const result = service.breakdown({
      vehicleId: 'bus',
      durationHours: bus.minHours,
      moversCount: 0,
      hasLiftFrom: true,
      hasLiftTo: true,
      floorsFrom: 1,
      floorsTo: 1,
      needPacking: false,
      needAssembly: false,
      isHeavyItem: false,
    });

    expect(result.vehicle).toBe(bus.basePrice);
    expect(result.movers).toBe(0);
    expect(result.total).toBe(bus.basePrice);
  });

  it('does not include route or delivery fees', () => {
    const gazelle = VEHICLES.find((v) => v.id === 'gazelle')!;
    const result = service.breakdown({
      vehicleId: 'gazelle',
      durationHours: gazelle.minHours,
      moversCount: 2,
      hasLiftFrom: true,
      hasLiftTo: true,
      floorsFrom: 1,
      floorsTo: 1,
      needPacking: true,
      needAssembly: false,
      isHeavyItem: false,
    });

    const movers =
      2 * Math.max(gazelle.minHours, PRICING.movers.minHours) * PRICING.movers.ratePerHourPerMover;
    const extras = PRICING.extras.packing;

    expect(result.vehicle).toBe(gazelle.basePrice);
    expect(result.movers).toBe(movers);
    expect(result.extras).toBe(extras);
    expect(result.total).toBe(gazelle.basePrice + movers + extras);
  });
});
