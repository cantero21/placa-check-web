import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  readonly LogIn = LogIn;
  readonly ArrowLeft = ArrowLeft;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  username = '';
  password = '';
  showPassword = signal(false);
  error = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.error.set('Completa ambos campos');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Usuario o contraseña incorrectos');
      }
    });
  }
}
