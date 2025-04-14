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

  getCharactersGender(
    genero?: string,
    edad?:  number, // Accepts either dob string or age number
    distancia?: string,
) {

  let LINK = '';

  if (genero) LINK += `&genero=${genero}`;
  // si viene la edad buscamos dentro de dob.age
if (edad !== undefined) {
    const age = typeof edad === 'number' 
        ? edad 
        : new Date().getFullYear() - new Date(edad).getFullYear();
    LINK += `&edad=${edad}`;
}
    if (distancia) LINK += `&distancia=${distancia}`;
    
    // Fix URL to add '?' before first query parameter
    if (LINK.length > 0) {
      LINK = '?' + LINK.substring(1);
    }

    return this.http.get<Usuario[]>(`./assets/data/users.json${LINK}`);


  }
//   getCharactersGender(
//     genero?: string,
//     distancia?: string,
//     dobOrAge?: string | number // Accepts either dob string or age number
// ) {

//   let LINK = '';

//     if (distancia) LINK += `&distance=${distancia}`;
//     if (genero) LINK += `&gender=${genero}`;
    
//     // si viene la edad buscamos dentro de dob.age
//   if (dobOrAge !== undefined) {
//       const age = typeof dobOrAge === 'number' 
//           ? dobOrAge 
//           : new Date().getFullYear() - new Date(dobOrAge).getFullYear();
//       LINK += `&dob_age=${age}`;
//   }


//     const url =
//       this.base_url +
//       '?exc=login,registered' +
//       // '&exc=registered' +
//       // page +
//       LINK;

//     // const url = `${this.base_url}/?gender=${genero}`;

//     return this.httpClient
//       .get<any>(url)
//       // .pipe(map((resp: { ok: boolean; resp }) => resp));
//   }

  

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
