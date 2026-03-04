import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleRequest } from '../models/vehicle.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  searchByPlate(plate: string): Observable<Vehicle[]> {
    const params = new HttpParams().set('plate', plate);
    return this.http.get<Vehicle[]>(`${this.url}/search`, { params });
  }

  searchByOwner(owner: string): Observable<Vehicle[]> {
    const params = new HttpParams().set('owner', owner);
    return this.http.get<Vehicle[]>(`${this.url}/search`, { params });
  }

  findAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url);
  }

  create(vehicle: VehicleRequest): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.url, vehicle);
  }

  update(id: number, vehicle: VehicleRequest): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.url}/${id}`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
