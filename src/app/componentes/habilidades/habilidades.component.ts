import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent {
  isAuthenticated: boolean;
  habilidades: any[] = [];
  nuevaHabilidad: any = {
    tecnologia: '',
    nivel: ''
  };
  mostrarFormulario: boolean = false;

  constructor(
    private portfolioService: PortfolioService,
    private userService: UserService
  ) {
    this.isAuthenticated = this.userService.getIsAuthenticated();
  }

  ngOnInit(): void {
    this.portfolioService.obtenerHabilidades().subscribe(data => {
      console.log(data);
      this.habilidades = data;
    });
  }

  agregarHabilidad() {
    this.portfolioService.agregarHabilidad(this.nuevaHabilidad).subscribe(data => {
      console.log(data);
      this.habilidades.push(data);
    });
    this.nuevaHabilidad = {
      tecnologia: '',
      nivel: ''
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  eliminar(id: number) {
    this.portfolioService.eliminarHabilidad(id).subscribe(data => {
      console.log(data);
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id !== id);
    });
  }
}