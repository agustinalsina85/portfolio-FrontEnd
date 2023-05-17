import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { Proyectos } from 'src/app/dto/proyectos';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  isAuthenticated: boolean;
  proyectos: Proyectos[] = [];
  nuevaProyecto: Proyectos = {
    id: 0,
    nombreProye: '',
    repoUrlProye: '',
    liveUrlProye: '',
    imgUrlProye: '',
    descripcionProye: ''
  };
  mostrarFormulario: boolean = false;

  constructor(
    private portfolioService: PortfolioService,
    private userService: UserService
  ) {
    this.isAuthenticated = this.userService.getIsAuthenticated();
  }

  ngOnInit(): void {
    this.portfolioService.obtenerProyectos().subscribe((data: Proyectos[]) => {
      this.proyectos = data;
    });
  }

  agregarProyecto() {
    this.portfolioService.agregarProyecto(this.nuevaProyecto).subscribe((data: Proyectos) => {
      this.proyectos.push(data);
    });
    this.nuevaProyecto = {
      id: 0,
      nombreProye: '',
      repoUrlProye: '',
      liveUrlProye: '',
      imgUrlProye: '',
      descripcionProye: ''
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  eliminar(id: number) {
    this.portfolioService.eliminarProyecto(id).subscribe(data => {
      this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
    });
  }
}