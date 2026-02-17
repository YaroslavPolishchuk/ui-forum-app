import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  onRegisterClick(form: NgForm):void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      console.log("Alert")
      setTimeout(()=>{
        form.form.markAsUntouched();
      },2000)
      return;
    }

  }

  email = '';
  password = '';
  username = '';
}
