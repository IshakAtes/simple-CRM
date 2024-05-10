import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: '**', redirectTo: '' }
];
