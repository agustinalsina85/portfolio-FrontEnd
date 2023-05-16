import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  urlBackend: string = "https://portfolio-backend-34ht.onrender.com/"

  constructor(private http: HttpClient) { }

  obtenerEncabezado(): Observable<any> {
    return this.http.get(this.urlBackend + 'persona/ver');
  }

  obtenerExperiencia(): Observable<any> {
    return this.http.get(this.urlBackend + 'experiencia/ver');
  }

  obtenerEducacion(): Observable<any> {
    return this.http.get(this.urlBackend + 'educacion/ver');
  }

  obtenerHabilidades(): Observable<any> {
    return this.http.get(this.urlBackend + 'tecnologia/ver');
  }

  agregarHabilidad(habilidad: any): Observable<any> {
    return this.http.post(this.urlBackend + 'tecnologia/nueva', habilidad);
  }

  eliminarHabilidad(idHabilidad: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}tecnologia/delete/${idHabilidad}`);
  }

  obtenerProyectos(): Observable<any> {
    return this.http.get(this.urlBackend + 'proyectos/ver');
  }
}
