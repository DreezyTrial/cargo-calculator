export const PRICING = {
  movers: {
    ratePerHourPerMover: 350,
    minHours: 2,
    floorSurchargePerFloorPerMover: 50,
  },
  extras: {
    packing: 350,
    assembly: 300,
    heavyItem: 400,
  },
  duration: {
    maxHours: 10,
  },
} as const;
