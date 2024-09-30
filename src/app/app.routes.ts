import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard], 
        children: [
            {
                path: 'register-patient',
                component: RegisterPatientComponent
            },
            {
                path: 'list-patient',
                component: PatientListComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'contactus',
                component: ContactusComponent
            }
        ]
    }
];
