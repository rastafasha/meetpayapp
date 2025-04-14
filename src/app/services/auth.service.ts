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
export class AuthService {

  public auth2: any;
    public usuario!:Usuario;
    user:any;
  
    constructor(
      private http: HttpClient,
      private router: Router,
      private ngZone: NgZone
      ) {
        this.getLocalStorage();
        // this.googleInit();
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
  
  
    getUser(){
      return this.user;
    }
  
  
    getLocalStorage(){
      if(localStorage.getItem('token') && localStorage.getItem('usuario')){
        let USER = localStorage.getItem('usuario');
        this.user = JSON.parse(USER ? USER: '');
        this.router.navigateByUrl('/start-meet');
      }else{
        this.user = null;
        this.router.navigateByUrl('/login');
      }
    }
  
    getCurrentUser(): Usuario | null {
      const userData = localStorage.getItem('usuario');
      return userData ? JSON.parse(userData) : null;
    }
  
    guardarLocalStorage(token: string, user: Usuario){
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(user));
      this.user = user;
    }
  
  
    // googleInit(){
  
    //   return new Promise<void>((resolve) =>{
  
    //     gapi.load('auth2', () =>{
    //       this.auth2 = gapi.auth2.init({
    //         client_id: userGoogle,
    //         cookiepolicy: 'single_host_origin',
    //       });
    //       resolve();
    //     });
    //   });
  
  
    // }
  
    
    login(formData: LoginForm){
      return this.http.post(`${base_url}/auth/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.usuario);
          // this.refresh();
          this.validarToken();
        })
      )
    }
  
    loginGoogle(token:string){
      return this.http.post(`${base_url}/auth/google`, {token})
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.usuario);
          this.refresh();
        })
      )
    }
  
    logout(){
      this.refresh();
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      // localStorage.removeItem('authenticated');
      // this.router.navigateByUrl('/home');
      // this.router.navigateByUrl('/');
      this.auth2.signOut().then(()=>{
        this.ngZone.run(()=>{
          this.refresh();
          this.router.navigateByUrl('/login');
        })
      })
      
    }
  
    refresh(): void {
      window.location.reload();
      this.router.navigateByUrl('/home');
    }
  
    validarToken(): Observable<boolean>{
  
      return this.http.get(`${base_url}/auth/renew`, {
        headers: {
          'x-token': this.token
        }
      }).pipe(
        map((resp: any) => {
          const { username, email, google, role,  uid} = resp.usuario;
  
          this.usuario = new Usuario(username, email, '', google, role, uid, '', '', '');
  
          this.guardarLocalStorage(resp.token, resp.usuario);
          return true;
        }),
        catchError(error => of(false))
      );
    }
  
    crearUsuario(formData: RegisterForm){
      return this.http.post(`${base_url}/usuarios/crear`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.usuario);
        })
      )
    }
  
    closeMenu(){
      var menuLateral = document.getElementsByClassName("sidebar");
        for (var i = 0; i<menuLateral.length; i++) {
           menuLateral[i].classList.remove("active");
  
        }
    }
  
    set_recovery_token(email:string):Observable<any>{
  
      const url = `${base_url}/usuarios/user_token/set/${email}`;
      return this.http.get<any>(url, this.headers)
    }
  
  
    verify_token(email:string,codigo:string):Observable<any>{
      const url = `${base_url}/usuarios/user_verify/token/${email}/${codigo}`;
      return this.http.get<any>(url, this.headers)
    }
  
    change_password(email:string,data:string):Observable<any>{
      const url = `${base_url}/usuarios/user_password/change/${email}/${data}`;
      return this.http.put<any>(url, this.headers)
    }
    forgotPassword(data:string):Observable<any>{
      const url = `${base_url}/usuarios/user_password/change/${data}`;
      return this.http.put<any>(url, this.headers)
    }
}
