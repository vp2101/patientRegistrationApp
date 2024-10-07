import { Component, OnInit } from '@angular/core';
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
  currentPage: number = 1;
  itemsPerPage: number = 5; // Default items per page
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  paginatedPatients: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPatients();
    this.updatePaginatedPatients();
  }

  loadPatients() {
    this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
    this.updatePaginatedPatients();
  }

  updatePaginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPatients = this.patients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to the first page when items per page changes
    this.updatePaginatedPatients();
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

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPatients();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPatients();
    }
  }

  get totalPages() {
    return Math.ceil(this.patients.length / this.itemsPerPage);
  }
}
