import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  selectedPatient: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
  }

  openEditModal(index: number) {
    this.selectedPatient = { ...this.patients[index] }; // Clone the patient data
    const modalElement = document.getElementById('editPatientModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Show modal
      modalElement.style.display = 'block'; // Display modal
    }
  }

  updatePatient() {
    const index = this.patients.findIndex(patient => patient.name === this.selectedPatient.name);
    if (index !== -1) {
      this.patients[index] = this.selectedPatient; // Update the patient data
      localStorage.setItem('patients', JSON.stringify(this.patients));
      alert('Patient updated successfully!');
      this.loadPatients(); // Refresh the list
      this.closeModal(); // Close modal
    }
  }

  deletePatient(index: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patients.splice(index, 1);
      localStorage.setItem('patients', JSON.stringify(this.patients));
      alert('Patient deleted successfully!');
      this.loadPatients(); 
    }
  }

  closeModal() {
    const modalElement = document.getElementById('editPatientModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }
}
