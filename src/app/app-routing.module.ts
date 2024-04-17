import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadComponent } from './pages/preload/preload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';

const routes: Routes = [
  { path: 'Preload', component: PreloadComponent },
  { 
    path: 'Dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'Home' }
    ] 
  },
  { path: '', pathMatch: 'full', redirectTo: 'Dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
