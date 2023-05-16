import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  educacion: any[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.obtenerEducacion().subscribe(data =>{
      console.log(data);
      this.educacion = data;
    });
  }
}
