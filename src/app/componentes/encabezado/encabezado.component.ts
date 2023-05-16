import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Persona } from 'src/app/dto/persona';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  encabezado: Persona[] = [];

  constructor(private datosEncabezado: PortfolioService) { }

  ngOnInit(): void {
    this.datosEncabezado.obtenerEncabezado().subscribe((data: Persona[]) => {
      this.encabezado = data;
    });
  }

}