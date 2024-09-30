import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientModel } from '../model/Patient';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  patient: PatientModel = new PatientModel();
  authService = inject(AuthService);
  router = inject(Router);

  images: string[] = [
    "https://as2.ftcdn.net/v2/jpg/05/12/30/73/1000_F_512307383_W2J5HmbSfDxyzz38N00hBs2DagDgHDI3.jpg",
    "https://as2.ftcdn.net/v2/jpg/07/53/88/51/1000_F_753885151_OY9RMyqQ7tJwlZ1CJUQbgnnCgPzIp5ws.jpg",
    "https://img.freepik.com/free-photo/patient-with-nasal-oxygen-tube-receiving-consultation-from-doctor-using-stethoscope-heartbeat-exam-medic-consulting-retired-woman-with-disease-while-nurse-assisting-with-tablet_482257-28806.jpg?w=1060&t=st=1726728191~exp=1726728791~hmac=44e27398f9981afad082c98ca6bdd8146dd13a6e654141380eb5450ea794f347",
    "https://as2.ftcdn.net/v2/jpg/01/24/92/83/1000_F_124928348_gmLHtItkKNtTTHiNVN2Fz2WjinAZF1jl.jpg",
    "https://as2.ftcdn.net/v2/jpg/05/53/23/15/1000_F_553231584_LCt7WYuORVw2QQ6BBRNj5w5pTBWCFKO5.jpg",
    "https://as2.ftcdn.net/v2/jpg/06/10/76/49/1000_F_610764986_Ji7Qyh91fLjhzA9fGrMypcq7qgkCWdWZ.jpg"
  ];
  currentImage: string = '';
  currentIndex: number = 0;

  ngOnInit() {
    this.currentImage = this.images[this.currentIndex];
    this.startImageCarousel();
  }

  startImageCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 3000); // Change image every 3 seconds
  }

  onSubmit() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.push(this.patient);
    localStorage.setItem('patients', JSON.stringify(patients));
    alert('Patient registered successfully!');
    this.patient = new PatientModel();
  }

  navigateToListPatient() {
    this.router.navigate(['/list-patient']);
  }
}
