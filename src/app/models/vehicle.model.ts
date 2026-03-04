export interface Vehicle {
  id: number;
  licensePlate: string;
  ownerName: string;
  workArea: string;
}

export interface VehicleRequest {
  licensePlate: string;
  ownerName: string;
  workArea: string;
}
