export interface OrderRequest {
  name: string;
  phone: string;
  orderDate: string;
  city: string;
  vehicleName: string;
  durationHours: number;
  moversCount: number;
  hasLiftFrom: boolean;
  floorsFrom: number;
  hasLiftTo: boolean;
  floorsTo: number;
  workDescription: string;
  extraServicesNote: string;
  vehiclePrice: number;
  moversPrice: number;
  total: number;
}
