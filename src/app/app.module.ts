import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloadComponent } from './pages/preload/preload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { PedidosComponent } from './pages/dashboard/home/pedidos/pedidos.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from './pipes/decimal.pipe';
import { DatemodPipe } from './pipes/date.pipe';
import { PedidoComponent } from './pages/dashboard/home/pedidos/pedido/pedido.component';
import { ComponentesComponent } from './pages/dashboard/componentes/componentes.component';

@NgModule({
  declarations: [
    AppComponent,
    PreloadComponent,
    DashboardComponent,
    HomeComponent,
    PedidosComponent,
    DecimalPipe,
    DatemodPipe,
    PedidoComponent,
    ComponentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
