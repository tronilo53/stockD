import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  public meses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public anios: string[] = ['2023', '2024'];
  //public meses:string[] = environment.meses;
  //public anios:string[] = environment.anios;
  public month: string = 'Enero';
  public anio: string = '???';
  /*public binding: any = {
    ano: '???',
    mes: '???'
  };*/

  public limpiarFiltros(): void {
    alert(this.anio);
    //this.binding.ano = '???';
    //this.binding.mes = '???';
  }
}
