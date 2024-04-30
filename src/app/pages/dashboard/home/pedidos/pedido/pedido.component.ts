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
      this.dataService.query({ passCode: '004', referencia: this.referencia }).subscribe((resp: any) => {
        this.pedido = JSON.parse(resp.res);
      });
    });
  }
}
