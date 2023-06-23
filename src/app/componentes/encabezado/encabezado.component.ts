import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { Persona } from 'src/app/dto/persona';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  isAuthenticated: boolean;
  encabezado: Persona[] = [];
  nuevaEncabezado: Persona = {
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

  agregarEncabezado() {
    this.portfolioService.agregarEncabezado(this.nuevaEncabezado).subscribe((data: Persona) => {
      if (this.nuevaEncabezado.id) {
        const index = this.encabezado.findIndex(enc => enc.id === data.id);
        this.encabezado[index] = data;
      } else {
        this.encabezado.push(data);
      }
      this.portfolioService.obtenerEncabezado().subscribe((data: Persona[]) => {
        this.encabezado = data;
      });
    });
    this.nuevaEncabezado = {
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
    this.nuevaEncabezado = {
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
    this.nuevaEncabezado = { ...acercade};
    this.mostrarFormulario = true;
  }

}