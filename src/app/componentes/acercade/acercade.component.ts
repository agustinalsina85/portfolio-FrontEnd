import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Persona } from 'src/app/dto/persona';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent {
  encabezado: Persona[] = [];

  constructor(private datosEncabezado: PortfolioService) { }

  ngOnInit(): void {
    this.datosEncabezado.obtenerEncabezado().subscribe((data: Persona[]) => {
      console.log(data);
      this.encabezado = data;
    });
  }

}