import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { Persona } from 'src/app/dto/persona';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent {
  isAuthenticated: boolean;
  encabezado: Persona[] = [];
  nuevaAcercade: Persona = {
    id: 0,
    nombre: '',
    descripcion: '',
    bannerUrl: '',
    imgUrl: '',
    ocupacion: '',
    email: '',
    githubUrl: '',
    whatsappUrl: '',
    domicilio: ''
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
    this.portfolioService.obtenerEncabezado().subscribe((data: Persona[]) => {
      this.encabezado = data;
    });
  }

  agregarAcercade() {
    this.portfolioService.agregarEncabezado(this.nuevaAcercade).subscribe((data: Persona) => {
      if (this.nuevaAcercade.id) {
        const index = this.encabezado.findIndex(acer => acer.id === data.id);
        this.encabezado[index] = data;
      } else {
        this.encabezado.push(data);
      }
      this.portfolioService.obtenerEncabezado().subscribe((data: Persona[]) => {
        this.encabezado = data;
      });
    });
    this.nuevaAcercade = {
      id: 0,
      nombre: '',
      descripcion: '',
      bannerUrl: '',
      imgUrl: '',
      ocupacion: '',
      email: '',
      githubUrl: '',
      whatsappUrl: '',
      domicilio: ''
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.nuevaAcercade = {
      id: 0,
      nombre: '',
      descripcion: '',
      bannerUrl: '',
      imgUrl: '',
      ocupacion: '',
      email: '',
      githubUrl: '',
      whatsappUrl: '',
      domicilio: ''
    };
    this.mostrarFormulario = !this.mostrarFormulario;

  }

  editar(acercade: Persona) {
    this.nuevaAcercade = { ...acercade};
    this.mostrarFormulario = true;
  }

}