import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent {
  encabezado:any[] = [];

  constructor(private datosEncabezado:PortfolioService) {}

  ngOnInit(): void {
    this.datosEncabezado.obtenerEncabezado().subscribe(data =>{
      console.log(data);
      this.encabezado=data;
    });
  }

}