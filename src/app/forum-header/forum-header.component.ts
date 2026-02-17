import { Component } from '@angular/core';
import { Router, RouterLink,RouterModule } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forum-header',
  templateUrl: './forum-header.component.html',
  styleUrls: ['./forum-header.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, RouterModule]
})
export class ForumHeaderComponent {

  loginValue = '';
  passwordValue = '';
  error = '';

  constructor(public authService: AuthService, private router:Router) { }

  async onLoginClick(form:any): Promise<void> {
    form.form.markAllAsTouched();
    if (form.invalid) {
      console.log("Alert")
      setTimeout(()=>{
        form.form.markAsUntouched();
      },2000)
      return;
    }
    const response: LoginResponse = await this.authService.login(this.loginValue, this.passwordValue);
    if (!response.success) {
      this.error = 'Неверный логин или пароль';
      setTimeout(() => {
        this.error = '';
      }, 1000);
      this.loginValue = '';
      this.passwordValue = '';
    }
  }

  onRegisterClick():void{
    this.router.navigate(['/register'])
  }

  async registerClick():Promise<void>{

  }

  isLoggedIn(): boolean {
    return !!this.authService.currentUser;
  }
  get username(): string {
    return this.authService.currentUser?.username || '';
  }

}
