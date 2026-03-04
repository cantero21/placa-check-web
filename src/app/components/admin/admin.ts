import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Pencil, Trash2, ArrowLeft, LogOut, X, Car } from 'lucide-angular';
import { VehicleService } from '../../services/vehicle';
import { AuthService } from '../../services/auth';
import { Vehicle, VehicleRequest } from '../../models/vehicle.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {

  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly ArrowLeft = ArrowLeft;
  readonly LogOut = LogOut;
  readonly X = X;
  readonly Car = Car;

  vehicles = signal<Vehicle[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  loading = signal(false);
  error = signal('');
  success = signal('');

  form: VehicleRequest = {
    licensePlate: '',
    ownerName: '',
    workArea: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.findAll().subscribe({
      next: (data) => this.vehicles.set(data),
      error: () => this.error.set('Error al cargar vehículos')
    });
  }

  openForm(vehicle?: Vehicle): void {
    if (vehicle) {
      this.editingId.set(vehicle.id);
      this.form = {
        licensePlate: vehicle.licensePlate,
        ownerName: vehicle.ownerName,
        workArea: vehicle.workArea
      };
    } else {
      this.editingId.set(null);
      this.form = { licensePlate: '', ownerName: '', workArea: '' };
    }
    this.showForm.set(true);
    this.error.set('');
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.error.set('');
  }

  onSubmit(): void {
    if (!this.form.licensePlate.trim() || !this.form.ownerName.trim() || !this.form.workArea.trim()) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const request: VehicleRequest = {
      ...this.form,
      licensePlate: this.form.licensePlate.toUpperCase()
    };

    const action$ = this.editingId()
      ? this.vehicleService.update(this.editingId()!, request)
      : this.vehicleService.create(request);

    action$.subscribe({
      next: () => {
        this.loading.set(false);
        this.closeForm();
        this.loadVehicles();
        this.success.set(this.editingId() ? 'Vehículo actualizado' : 'Vehículo registrado');
        setTimeout(() => this.success.set(''), 3000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.error || 'Error al guardar');
      }
    });
  }

  onDelete(vehicle: Vehicle): void {
    if (!confirm(`¿Eliminar el vehículo ${vehicle.licensePlate}?`)) return;

    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => {
        this.loadVehicles();
        this.success.set('Vehículo eliminado');
        setTimeout(() => this.success.set(''), 3000);
      },
      error: () => this.error.set('Error al eliminar')
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
