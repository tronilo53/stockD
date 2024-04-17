import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public chart: any = [];
  private meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  private datosPedidos: number[] = [2, 3, 7, 1, 12, 7, 5, 2, 11, 3, 2, 4];
  ngOnInit(): void {
    this.chartPedidos();
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
}
