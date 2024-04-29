import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  /**
   * * Propiedades
   */

  public pedidos: any[] = [];
  public meses:string[] = environment.meses;
  public anios:string[] = environment.anios;

  public binding: any = {
    ano: '???',
    mes: '???' 
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.query({ passCode: '003', all: 'ok' }).subscribe((resp: any) => {
      this.pedidos = resp;
    });
  }

  public mostrarTodos(): void {
    this.binding.ano = '???';
    this.binding.mes = '???';
    this.pedidos = [];
    this.dataService.query({ passCode: '003', all: 'ok' }).subscribe((resp: any) => {
      this.pedidos = resp;
    });
  }
}
