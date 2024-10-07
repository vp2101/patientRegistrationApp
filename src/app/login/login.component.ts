import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: ''
  }

  userLogin: any = {
    userName: '',
    password: '',
  }

  router = inject(Router);
  authService = inject(AuthService);

  onRegister() {
    if (!this.isValidEmail(this.userRegisterObj.emailId)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!this.isValidUserName(this.userRegisterObj.userName)) {
      alert("User Name is Mandatory.");
      return;
    }

    if (!this.isValidPassword(this.userRegisterObj.password)) {
      alert("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.");
      return;
    }

    this.authService.register(this.userRegisterObj);
    alert("Registration Success");

    // Clear the registration form
    this.resetRegisterForm();
  }

  onLogin() {
    if (this.authService.login(this.userLogin.userName, this.userLogin.password)) {
      this.router.navigateByUrl('register-patient');
    } else {
      alert("User name or password is wrong");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private isValidUserName(userName: string): boolean {
    const validUserName = /^[A-Za-z]+(?:[-' ]?[A-Za-z]+)*$/;
    return validUserName.test(userName);
  
  }

  private isValidPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  }

  private resetRegisterForm() {
    this.userRegisterObj = {
      userName: '',
      password: '',
      emailId: ''
    };
  }
}
