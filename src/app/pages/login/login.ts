import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private route: Router) {}

  submit(): void {
    this.error = '';
    this.loading = true;
    this.auth.login(this.email, this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.route.navigate(['/']),
        error: err => this.error = err?.error ?? 'Login failed'
      });
  }
}