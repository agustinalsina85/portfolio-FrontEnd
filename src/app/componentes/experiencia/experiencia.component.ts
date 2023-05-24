import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { Experiencias } from 'src/app/dto/experiencias';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  isAuthenticated: boolean;
  experiencias: Experiencias[] = [];
  nuevaExperiencia: Experiencias = {
    id: 0,
    puestoExp: '',
    organismoExp: '',
    periodoExp: '',
    urlLogoExp: '',
    descripcionExp: ''
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
    this.portfolioService.obtenerExperiencia().subscribe((data: Experiencias[]) => {
      this.experiencias = data;
    });
  }

  agregarExperiencia() {
    this.portfolioService.agregarExperiencia(this.nuevaExperiencia).subscribe((data: Experiencias) => {
      if (this.nuevaExperiencia.id) {
        const index = this.experiencias.findIndex(exp => exp.id === data.id);
        this.experiencias[index] = data;
      } else {
        this.experiencias.push(data);
      }
      location.reload();
    });
    this.nuevaExperiencia = {
      id: 0,
      puestoExp: '',
      organismoExp: '',
      periodoExp: '',
      urlLogoExp: '',
      descripcionExp: ''
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  eliminar(id: number) {
    this.portfolioService.eliminarExperiencia(id).subscribe(data => {
      this.experiencias = this.experiencias.filter(experiencia => experiencia.id !== id);
    });
  }

  editar(experiencia: Experiencias) {
    this.nuevaExperiencia = {...experiencia};
    this.mostrarFormulario = true;
  }
}