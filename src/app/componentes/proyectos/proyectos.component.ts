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
    this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
  });
}

  ngOnInit(): void {
    this.portfolioService.obtenerProyectos().subscribe((data: Proyectos[]) => {
      this.proyectos = data;
    });
  }

  agregarProyecto() {
    this.portfolioService.agregarProyecto(this.nuevaProyecto).subscribe((data: Proyectos) => {
      if (this.nuevaProyecto.id) {
        const index = this.proyectos.findIndex(proye => proye.id === data.id);
        this.proyectos[index] = data;
      } else {
        this.proyectos.push(data);
      }
      location.reload();
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
    this.nuevaProyecto = {
      id: 0,
      nombreProye: '',
      repoUrlProye: '',
      liveUrlProye: '',
      imgUrlProye: '',
      descripcionProye: ''
    };
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  eliminar(id: number) {
    this.portfolioService.eliminarProyecto(id).subscribe(data => {
      this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
    });
  }

  editar(proyecto: Proyectos) {
    this.nuevaProyecto = {...proyecto};
    this.mostrarFormulario = true;
  }
}