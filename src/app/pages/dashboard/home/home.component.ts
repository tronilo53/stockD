import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  /**
   * * Propiedad {Variables para Crear los Chart.js}
   */
  public chartPedidos: any = [];
  public chartEquipos: any = [];
  /**
   * * Propiedad {Arrays con los meses del Año y modelos de equipos}
   */
  private meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private modelosDelaqua: string[] = ['Q1', 'Q2', 'Q3', 'Q4', 'Q4 Plus', 'Q5', 'Q5 Plus', 'Q5 Mixto', 'Q10', 'Q10 Plus', 'QI10', 'QI10 Plus', 'QI50', 'QI50 Plus', 'QI75', 'QI75 Plus'];
  private modelosDesincal: string[] = ['GBD1', 'GBD2', 'Gama Basica Plus', 'Gama Media', 'Gama Alta'];
  /**
   * * Propiedad {NgModel del año y el modelo para filtrar}
   */
  public ano: string = '2024';
  public modelo: string = 'Delaqua';
  /**
   * * Propiedad {Variables para guardar la data de los chart.js}
   */
  public datosPedidos: string[] = [];
  public datosEquipos: string[] = [];

  constructor( private _dataService: DataService ) {}

  ngOnInit(): void {

    this._dataService.query({ passCode: '001', year: Number(this.ano) }).subscribe((resp: any) => {

      this.datosPedidos = resp;

      this.runChartPedidos();
    });


    this._dataService.query({ passCode: '002', model: this.modelo }).subscribe((resp: any) => {

      this.datosEquipos = resp;

      this.runChartEquipos();
    });
  }
  private runChartPedidos(): void {
    this.chartPedidos = new Chart('pedidos', {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'Recuento',
            data: this.datosPedidos,
            backgroundColor: [ 'rgba(75, 192, 192, 0.2)' ],
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
  private runChartEquipos(): void {
    this.chartEquipos = new Chart('equipos', {
      type: 'bar',
      data: {
        labels: this.modelo === 'Delaqua' ? this.modelosDelaqua : this.modelosDesincal,
        datasets: [
          {
            label: 'Recuento',
            data: this. datosEquipos
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
  public filtrarPedidos(): void {

    this._dataService.query({ passCode: '001', year: Number(this.ano) }).subscribe((resp: any) => {

      if(this.chartPedidos) this.chartPedidos.destroy();
      
      this.datosPedidos = resp;

      this.runChartPedidos();
    });
  }
  public filtrarEquipos(): void {
    this._dataService.query({ passCode: '002', model: this.modelo }).subscribe((resp: any) => {

      if(this.chartEquipos) this.chartEquipos.destroy();

      this.datosEquipos = resp;

      this.runChartEquipos();
    });
  }
}
