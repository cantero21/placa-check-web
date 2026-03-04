import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Search, Car, User, Building2, Shield } from 'lucide-angular';
import { VehicleService } from '../../services/vehicle';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './search.html'
})
export class SearchComponent {

  readonly Search = Search;
  readonly Car = Car;
  readonly User = User;
  readonly Building2 = Building2;
  readonly Shield = Shield;

  searchTerm = '';
  searchType: 'plate' | 'owner' = 'plate';
  results = signal<Vehicle[]>([]);
  searched = signal(false);
  loading = signal(false);

  constructor(private vehicleService: VehicleService) {}

  onSearch(): void {
    const term = this.searchTerm.trim();
    if (!term) return;

    this.loading.set(true);
    this.searched.set(true);

    const search$ = this.searchType === 'plate'
      ? this.vehicleService.searchByPlate(term)
      : this.vehicleService.searchByOwner(term);

    search$.subscribe({
      next: (data) => {
        this.results.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }

  toggleSearchType(): void {
    this.searchType = this.searchType === 'plate' ? 'owner' : 'plate';
    this.searchTerm = '';
    this.results.set([]);
    this.searched.set(false);
  }
}
