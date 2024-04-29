import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  public viewPedidos: boolean = false;
  public loading: boolean = true;
  public alertPedidos: boolean = false;
  public pedidos: any[] = [];
  public meses:string[] = environment.meses;
  public anios:string[] = environment.anios;
  public title: string = '';

  @ViewChild('mesSelect') mesSelect: ElementRef;
  @ViewChild('anoSelect') anoSelect: ElementRef;

  public binding: any = {
    ano: '???',
    mes: '???' 
  };

  constructor(
    private dataService: DataService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    //Peticion para obtener todos los pedidos
    this.dataService.query({ passCode: '003', all: 'ok' }).subscribe((resp: any) => {
      //Se igualan los pedidos recibidos a la variable pedidos
      this.pedidos = resp;
      //Se Oculta el Loading
      this.loading = false;
      //Se cambia el nombre del titulo
      this.title = 'Todos los pedidos';
      //Si no existen pedidos...
      if(this.pedidos.length == 0) {
        //Se ocultan los pedidos
        this.viewPedidos = false;
        //Se muestra una alerta
        this.alertPedidos = true;
      //Si existen pedidos...
      }else {
        //Se muestran los pedidos
        this.viewPedidos = true;
        //Se oculta la alerta
        this.alertPedidos = false;
      }
    });
  }
  /**
   * * Function {Se remueve el borde rojo}
   */
  public removeBorder(): void {
    //Se remueve el borde del mes
    this.renderer.removeClass(this.mesSelect.nativeElement, 'border__error');
    //Se remueve el borde del Año
    this.renderer.removeClass(this.anoSelect.nativeElement, 'border__error');
  }
  /**
   * * Function {Se muestran todos los pedidos}
   */
  public mostrarTodos(): void {
    //Se resetean los selects
    this.binding.ano = '???';
    this.binding.mes = '???';
    //Se resetean los pedidos
    this.pedidos = [];
    //Se ocultan los pedidos
    this.viewPedidos = false;
    //Se oculta la alerta
    this.alertPedidos = false;
    //Se muestra el loading
    this.loading = true;
    //Peticion para Obtener todos los pedidos
    this.dataService.query({ passCode: '003', all: 'ok' }).subscribe((resp: any) => {
      //Se igualan los pedidos recibidos a la variable pedidos
      this.pedidos = resp;
      //Se Oculta el Loading
      this.loading = false;
      //Se cambia el nombre del titulo
      this.title = 'Todos los pedidos';
      //Si no existen pedidos...
      if(this.pedidos.length == 0) {
        //Se ocultan los pedidos
        this.viewPedidos = false;
        //Se muestra una alerta
        this.alertPedidos = true;
      //Si existen pedidos...
      }else {
        //Se muestran los pedidos
        this.viewPedidos = true;
        //Se oculta la alerta
        this.alertPedidos = false;
      }

    });
  }
  /**
   * * Function {Se muestran los pedidos filtrados}
   */
  public filtrar(): void {
    //Si no se seleccionan filtros...
    if(this.binding.mes === '???' && this.binding.ano === '???') {
      //Se ponen los bordes rojos
      this.renderer.addClass(this.mesSelect.nativeElement, 'border__error');
      this.renderer.addClass(this.anoSelect.nativeElement, 'border__error');
    //Si se selecciona el mes pero no el año...
    }else {
      if(this.binding.mes !== '???' && this.binding.ano === '???') {
        //Se pone el borde rojo al año
        this.renderer.addClass(this.anoSelect.nativeElement, 'border__error');
      }else {
        //Se muestra el Loading
        this.loading = true;
        //Se resetean los pedidos
        this.pedidos = [];
        //Se ocultan los pedidos
        this.viewPedidos = false;
        //Se oculta la alerta
        this.alertPedidos = false;
        //Variable de datos a enviar en la Peticion
        let data: any = {};
        //Variable con el titulo
        let title: string = '';
        //Si se selecciona solo el año...
        if(this.binding.mes === '???' && this.binding.ano !== '???') {
          data = { passCode: '003', anio: this.binding.ano };
          title = `Año ${this.binding.ano}`;
        }else {
          data = { passCode: '003', mes: this.binding.mes, anio: this.binding.ano };
          title = `Mes ${this.binding.mes} - Año ${this.binding.ano}`;
        }
        console.log('Mes: ', this.binding.mes);
        console.log('Año: ', this.binding.ano);
        //Peticion para obtener los pedidos filtrados
        this.dataService.query(data).subscribe((resp: any) => {
          //se igualan los pedidos recibidos a la variable pedidos
          this.pedidos = resp;
          //Se oculta el loading
          this.loading = false;
          //Se cambia el nombre del titulo
          this.title = title;
          //Si no existen pedidos...
          if(this.pedidos.length == 0) {
            //Se ocultan los pedidos
            this.viewPedidos = false;
            //Se muestra una alerta
            this.alertPedidos = true;
          //Si existen pedidos...
          }else {
            //Se muestran los pedidos
            this.viewPedidos = true;
            //Se oculta la alerta
            this.alertPedidos = false;
          }
        });
      }
    }
  }
}
