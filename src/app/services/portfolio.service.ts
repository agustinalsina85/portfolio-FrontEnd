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
  
  //Experiencia
  obtenerExperiencia(): Observable<any> {
    return this.http.get(this.urlBackend + 'experiencia/ver');
  }

  agregarExperiencia(experiencia: any): Observable<any> {
    return this.http.post(this.urlBackend + 'experiencia/nueva', experiencia);
  }

  eliminarExperiencia(idExperiencia: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}experiencia/delete/${idExperiencia}`);
  }

  //Educacion
  obtenerEducacion(): Observable<any> {
    return this.http.get(this.urlBackend + 'educacion/ver');
  }

  agregarEducacion(educacion: any): Observable<any> {
    return this.http.post(this.urlBackend + 'educacion/nueva', educacion);
  }

  eliminarEducacion(idEducacion: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}educacion/delete/${idEducacion}`);
  }

  //Habilidades
  obtenerHabilidades(): Observable<any> {
    return this.http.get(this.urlBackend + 'tecnologia/ver');
  }

  agregarHabilidad(habilidad: any): Observable<any> {
    return this.http.post(this.urlBackend + 'tecnologia/nueva', habilidad);
  }

  eliminarHabilidad(idHabilidad: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}tecnologia/delete/${idHabilidad}`);
  }

  //Proyectos
  obtenerProyectos(): Observable<any> {
    return this.http.get(this.urlBackend + 'proyectos/ver');
  }

  agregarProyecto(proyecto: any): Observable<any> {
    return this.http.post(this.urlBackend + 'proyectos/nueva', proyecto);
  }

  eliminarProyecto(idProyecto: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}proyectos/delete/${idProyecto}`);
  }
}
