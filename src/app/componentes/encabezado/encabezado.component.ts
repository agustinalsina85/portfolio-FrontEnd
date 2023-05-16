import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  encabezado:any[] = [];

  constructor(private datosEncabezado:PortfolioService) {}

  ngOnInit(): void {
    this.datosEncabezado.obtenerEncabezado().subscribe(data =>{
      console.log(data);
      this.encabezado=data;
    });
  }

}