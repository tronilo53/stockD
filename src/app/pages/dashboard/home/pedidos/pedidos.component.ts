import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  public meses:string[] = environment.meses;
  public anios:string[] = environment.anios;

  public binding: any = {
    ano: '???',
    mes: '???'
  };

  public limpiarFiltros(): void {
    this.binding.ano = '???';
    this.binding.mes = '???';
  }
}
