import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  appIcon = 'registration.png'; 
  router = inject(Router);
  onLogout() {
    localStorage.removeItem('patient');
    localStorage.removeItem('patients'); // Clear patients data if needed
    this.router.navigate(['/login']);
  }
  onAbout() {
    this.router.navigate(['/about']);
  }
  onRegister() {
    this.router.navigate(['/register-patient']);
  }
  onListPatient() {
    this.router.navigate(['/list-patient']);
  }
  onContactUs() {
    this.router.navigate(['/contactus']);
  }

}
