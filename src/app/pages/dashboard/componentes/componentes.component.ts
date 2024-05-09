import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent implements OnInit {

  public categorias: string[] = environment.categorias;

  constructor() {}

  ngOnInit(): void {
    
  }
}
