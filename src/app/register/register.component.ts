import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  isSubmitted = false;

  onRegisterClick(form: NgForm): void {
    this.isSubmitted = true;
    if (form.invalid) {
      setTimeout(() => this.isSubmitted = false, 2000);
      return;
    }

    this.authService.register(form.value).subscribe({
      next: () => {
        this.status = 'success'
        this.message = 'Регистрация успешна';
        setTimeout(() => {
          this.status = '';
        }, 2000);
        form.reset();
      },
      error: (response) => {
        this.status = 'error'
        this.message = response.error;
        setTimeout(() => {
          this.status = '';
        }, 2000);
      }
    });
  }
  onInputChange() {
    this.status = '';
    this.message = '';
  }

  status: 'error' | 'success' | '' = '';
  message = '';
  email = '';
  password = '';
  username = '';
}
