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
  }

  ngOnInit(): void {
    this.portfolioService.obtenerExperiencia().subscribe((data: Experiencias[]) => {
      this.experiencias = data;
    });
  }

  agregarExperiencia() {
    this.portfolioService.agregarExperiencia(this.nuevaExperiencia).subscribe((data: Experiencias) => {
      this.experiencias.push(data);
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
}