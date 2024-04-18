import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public chart: any = [];
  private meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private modelosDelaqua: string[] = ['Q1', 'Q2', 'Q3', 'Q4', 'Q4 Plus', 'Q5', 'Q5 Plus', 'Q10', 'Q10 Plus', 'QI10', 'QI10 Plus', 'QI50', 'QI50 Plus', 'QI75', 'QI75 Plus'];
  private modelosDesincal: string[] = ['GBD1', 'GBD2', 'Gama Basica Plus', 'Gama Media', 'Gama Alta'];
  public ano: string = '2024';
  public modelo: string = 'Delaqua';
  private datosPedidos: number[] = [];
  private datosEquipos: number[] = [0, 0, 0, 0, 0];

  constructor( private _dataService: DataService ) {}

  ngOnInit(): void {
    this._dataService.obtenerPedidos({ passCode: '001' }).subscribe((resp: any) => {

      this.datosPedidos = resp;

      this.chartPedidos();
      this.chartEquipos();
    });
  }
  private chartPedidos(): void {
    this.chart = new Chart('pedidos', {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'Recuento',
            data: this. datosPedidos,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  private chartEquipos(): void {
    this.chart = new Chart('equipos', {
      type: 'pie',
      data: {
        labels: this.modelosDesincal,
        datasets: [
          {
            label: 'Recuento',
            data: this. datosEquipos
          },
        ],
      }
    });
  }
  public filtrarPedidos(): void {
    console.log(this.ano);
  }
}
