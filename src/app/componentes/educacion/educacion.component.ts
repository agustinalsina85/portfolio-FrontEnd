import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { Educaciones } from 'src/app/dto/educaciones';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  isAuthenticated: boolean;
  educaciones: Educaciones[] = [];
  nuevaEducacion: Educaciones = {
    id: 0,
    tituloEdu: '',
    institucionEdu: '',
    periodoEdu: '',
    urlLogoEdu: '',
    descripcionEdu: ''
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
    this.portfolioService.obtenerEducacion().subscribe((data: Educaciones[]) => {
      this.educaciones = data;
    });
  }

  agregarEducacion() {
    this.portfolioService.agregarEducacion(this.nuevaEducacion).subscribe((data: Educaciones) => {
      if (this.nuevaEducacion.id) {
        const index = this.educaciones.findIndex(edu => edu.id === data.id);
        this.educaciones[index] = data;
      } else {
        this.educaciones.push(data);
      }
      location.reload();
    });
    this.nuevaEducacion = {
      id: 0,
      tituloEdu: '',
      institucionEdu: '',
      periodoEdu: '',
      urlLogoEdu: '',
      descripcionEdu: ''
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  eliminar(id: number) {
    this.portfolioService.eliminarEducacion(id).subscribe(data => {
      this.educaciones = this.educaciones.filter(educacion => educacion.id !== id);
    });
  }

  editar(educacion: Educaciones) {
    this.nuevaEducacion = {...educacion};
    this.mostrarFormulario = true;
  }
}