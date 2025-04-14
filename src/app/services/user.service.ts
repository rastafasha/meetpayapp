import { Injectable, NgZone, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/user';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { environment } from '../environments/environment';

const base_url = environment.baseUrl;
// const userGoogle = environment.client_idGoogle;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario!:Usuario;
  user:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) {
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN' | 'USER' | 'MEMBER' {
    return this.usuario.role || 'USER';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

getUsersLocal(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>('./assets/data/users.json');
  }
getUserLocal(id:string): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`./assets/data/users.json/${id}`);
  }

  

  actualizarPerfil(data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/update/${this.uid}`, data, this.headers);
  }

  updateProfile(usuario:Usuario, uid:any) {
    const url = `${base_url}/usuarios/update/${uid}`;
    return this.http.put(url, usuario, this.headers);
  }

  update(user: Usuario){
    return this.http.put(`${base_url}/usuarios/update/${user}`,this.headers);
  }

 

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.username,
              user.email,
              '',
              // user.google || '',
              String(user.google) || '',
              String(user.terminos) || '',
              user.role || '',
              user.uid || '',
              user.numdoc || ''
            ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }

  getUserById(_id: string)  {
    const url = `${base_url}/usuarios/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuario: Usuario}) => resp.usuario)
        );
  }
  getUsuarios()  {
    const url = `${base_url}/usuarios/all`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: Usuario}) => resp.usuarios)
      )
  }
  getRecientes()  {
    const url = `${base_url}/usuarios/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: Usuario}) => resp.usuarios)
      )
  }

  getAllEditors()  {
    const url = `${base_url}/usuarios/editores/`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, editores: Usuario}) => resp.editores)
      )
  }


  deleteById(usuario: Usuario){
    const url = `${base_url}/usuarios/delete/${usuario}`;
    return this.http.delete(url, this.headers)
  }


  editarRole(usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/editarRole/${usuario.uid}`, usuario, this.headers);
  }
  cambiarMembresia(usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/activarMiembro/${usuario.uid}`, usuario, this.headers);
  }


  searchUsers(usuario:any):Observable<any>{

    const url = `${base_url}/todo/coleccion/usuarios/${usuario}`;
    return this.http.get<any>(url, this.headers)
  }
  

}
