import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadComponent } from './preload/preload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PreloadComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PagesModule { }
