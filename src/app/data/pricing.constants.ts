export const PRICING = {
  movers: {
    ratePerHourPerMover: 350,
    raisedRatePerHourPerMover: 450,
    raisedRateMinFloor: 5,
    raisedRateMaxFloor: 10,
    minHours: 2,
    floorSurchargePerFloorPerMover: 50,
  },
  duration: {
    maxHours: 10,
  },
} as const;
