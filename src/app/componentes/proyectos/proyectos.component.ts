import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos: any[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.obtenerProyectos().subscribe(data =>{
      console.log(data);
      this.proyectos = data;
    });
  }
}