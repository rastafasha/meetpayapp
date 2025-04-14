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
import { UserContact } from '../models/user-contact';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserContactService {

  public usuarioContact!:UserContact;
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

  getUserContacts() {
      const url = `${base_url}/usercontact`;
      return this.http.get(url, this.headers);
    }
  
    getByUserId(_id: any) {
      const url = `${base_url}/usercontact/user/${_id}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(map((resp: { ok: boolean; usuarioContact: UserContact }) => resp.usuarioContact));
    }
   createUserContacts(data:any) {
      const url = `${base_url}/usercontact/store/`;
      return this.http.post(url, data, this.headers);
    }
    updateUserContacts(data: any, uid: any) {
      const url = `${base_url}/usercontact/update/${uid}`;
      return this.http.put(url, data, this.headers);
    }
    updateStatus(data: any, uid: any) {
      const url = `${base_url}/usercontact/statusupdate/${uid}`;
      return this.http.put(url, data, this.headers);
    }
  
  
    deleteById(usuario: Usuario) {
      const url = `${base_url}/usercontact/delete/${usuario}`;
      return this.http.delete(url, this.headers);
    }
}
