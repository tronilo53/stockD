import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadComponent } from './pages/preload/preload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { PedidosComponent } from './pages/dashboard/home/pedidos/pedidos.component';
import { PedidoComponent } from './pages/dashboard/home/pedidos/pedido/pedido.component';
import { ComponentesComponent } from './pages/dashboard/componentes/componentes.component';

const routes: Routes = [
  { path: 'Preload', component: PreloadComponent },
  { 
    path: 'Dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'Pedidos', component: PedidosComponent },
      { path: 'Pedido/:referencia', component: PedidoComponent },
      { path: 'Componentes', component: ComponentesComponent },
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
