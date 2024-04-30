import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DataService } from '../../../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  /**
   * ? Propiedades
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
    //Se quitan los bordes rojos
    this.renderer.removeClass(this.mesSelect.nativeElement, 'border__error');
    this.renderer.removeClass(this.anoSelect.nativeElement, 'border__error');
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
      //Se muestra una alerta
      this.alertError('Comprueba los campos y vuelve a intentarlo');
    //Si se selecciona el mes pero no el año...
    }else {
      if(this.binding.mes !== '???' && this.binding.ano === '???') {
        //Se pone el borde rojo al año
        this.renderer.addClass(this.anoSelect.nativeElement, 'border__error');
        //Se muestra una alerta
        this.alertError('Comprueba los campos y vuelve a intentarlo');
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
          title = `Mes ${this.formatMes(this.binding.mes)} - Año ${this.binding.ano}`;
        }
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

  /**
   * * Function {Muestra una Alerta con Sweetalert2}
   * @param text Texto a mostrar
   */
  private alertError(text: string): void {
    Swal.fire({
      title: 'Upps!',
      icon: 'error',
      text: text,
      allowOutsideClick: false
    });
  }
  /**
   * * Function {Formatea el mes referente al numero de mes}
   * @param mes Numero del mes a formatear
   * @returns Devuelve el nombre del mes
   */
  private formatMes(mes: string): string {
    let text: string = '';
    switch(mes) {
      case '1': text = 'Enero'; break;
      case '2': text = 'Febrero'; break;
      case '3': text = 'Marzo'; break;
      case '4': text = 'Abril'; break;
      case '5': text = 'Mayo'; break;
      case '6': text = 'Junio'; break;
      case '7': text = 'Julio'; break;
      case '8': text = 'Agosto'; break;
      case '9': text = 'Septiembre'; break;
      case '10': text = 'Octubre'; break;
      case '11': text = 'Noviembre'; break;
      case '12': text = 'Diciembre'; break;
    }
    return text;
  }
}
