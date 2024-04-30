import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {

  public pedido: any[] = [];
  public referencia: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.referencia = params['referencia'];
      this.dataService.query({ passCode: '003', referencia: this.referencia }).subscribe((resp: any) => {
        this.pedido = resp.map((item => {
          return {
            fecha: item.fecha,
            id: item.id,
            pedido: JSON.parse(item.pedido),
            referencia: item.referencia,
            total: item.total
          };
        }));
        console.log(this.pedido);
      });
    });
  }
}
