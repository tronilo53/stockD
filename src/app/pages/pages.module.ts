import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadComponent } from './preload/preload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PreloadComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
