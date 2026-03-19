import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService:AuthService){}

  onRegisterClick(form: NgForm):void {        
    this.authService.register(form.value).subscribe({
      next:(response)=>{        
        this.status='success'
        this.message=response.message;
        console.log('Регистрация успешна');
        form.reset();
      },
      error:(response)=>{
        this.status='error'
        this.message=response.error;
        console.error(`Server error ${response}`);
      }
    });
  } 
  onInputChange() {    
      this.status = '';
      this.message = '';
  }
  
  status: 'error' | 'success' | '' = '';
  message='';
  email = '';
  password = '';
  username = '';
}
