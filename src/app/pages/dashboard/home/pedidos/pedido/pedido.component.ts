import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {
  /**
   * * Propiedades
   */
  public pedido: any[] = [];
  public referencia: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    //Peticion para obtener el parametro
    this.activatedRoute.params.subscribe((params: Params) => {
      //Se guarda el parametro recibido en la variable "referencia"
      this.referencia = params['referencia'];
      //Petcion para obtener el pedido referente a la referencia
      this.dataService.query({ passCode: '003', referencia: this.referencia }).subscribe((resp: any) => {
        //mapeo de la obtencion de los datos
        this.pedido = resp.map((item => {
          return {
            fecha: item.fecha,
            id: item.id,
            pedido: JSON.parse(item.pedido),
            referencia: item.referencia,
            total: item.total
          };
        }));
      });
    });
  }
}
