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
    });

    expect(result.vehicle).toBe(bus.hourlyRate * bus.minHours);
    expect(result.movers).toBe(0);
    expect(result.total).toBe(bus.hourlyRate * bus.minHours);
  });

  it('does not include extras or delivery fees', () => {
    const gazelle = VEHICLES.find((v) => v.id === 'gazelle')!;
    const result = service.breakdown({
      vehicleId: 'gazelle',
      durationHours: gazelle.minHours,
      moversCount: 2,
      hasLiftFrom: true,
      hasLiftTo: true,
      floorsFrom: 1,
      floorsTo: 1,
    });

    const movers =
      2 * Math.max(gazelle.minHours, PRICING.movers.minHours) * PRICING.movers.ratePerHourPerMover;

    expect(result.vehicle).toBe(gazelle.hourlyRate * gazelle.minHours);
    expect(result.movers).toBe(movers);
    expect(result.total).toBe(gazelle.hourlyRate * gazelle.minHours + movers);
  });

  it('uses 450 per hour from the 5th through the 10th floor without a lift', () => {
    const hours = 2;
    const movers = 2;
    const surcharge = PRICING.movers.floorSurchargePerFloorPerMover;
    const quote = (floorsFrom: number, floorsTo = 1, hasLiftFrom = false, hasLiftTo = true) =>
      service.breakdown({
        vehicleId: 'gazelle',
        durationHours: hours,
        moversCount: movers,
        hasLiftFrom,
        hasLiftTo,
        floorsFrom,
        floorsTo,
      }).movers;

    const expected = (rate: number, floorsFrom: number, floorsTo = 1) => {
      let total = movers * hours * rate;
      if (floorsFrom > 1) {
        total += (floorsFrom - 1) * surcharge * movers;
      }
      if (floorsTo > 1) {
        total += (floorsTo - 1) * surcharge * movers;
      }
      return total;
    };

    expect(quote(4)).toBe(expected(350, 4));
    expect(quote(5)).toBe(expected(450, 5));
    expect(quote(10)).toBe(expected(450, 10));
    expect(quote(11)).toBe(expected(350, 11));
    expect(quote(8, 3, false, false)).toBe(expected(450, 8, 3));
    expect(quote(9, 1, true, true)).toBe(movers * hours * 350);
  });
});
