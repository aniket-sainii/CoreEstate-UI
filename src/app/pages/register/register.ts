import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { form } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService) {}

  submit(): void {
    this.error = '';
    this.loading = true;
    this.auth.register(this.email, this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
    console.log('SUCCESS');
    alert('Registration successful! Please login.');
  },
  error: err => {
    console.log('ERROR', err);
    alert(err?.error=='User already exists' ? 'Email already registered' : 'Register failed');
  }
      });
  }
}
