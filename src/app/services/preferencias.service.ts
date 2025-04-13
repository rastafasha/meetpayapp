import { Injectable, NgZone } from '@angular/core';
import { environment } from '../environments/environment';
import { Preferencias } from '../models/preferencias';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../models/user';
import { map } from 'rxjs';
const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class PreferenciasService {
  public preferencia!: Preferencias;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  getPreferencias() {
    const url = `${base_url}/preferencias`;
    return this.http.get(url, this.headers);
  }

  getByUserId(_id: any) {
    const url = `${base_url}/preferencias/user/${_id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; preferencia: Preferencias }) => resp.preferencia));
  }
 createPreferencias(data:any) {
    const url = `${base_url}/preferencias/store/`;
    return this.http.post(url, data, this.headers);
  }
  updatePreferencias(data: any, uid: any) {
    const url = `${base_url}/preferencias/userupdate/${uid}`;
    return this.http.put(url, data, this.headers);
  }


  deleteById(usuario: Usuario) {
    const url = `${base_url}/preferencias/delete/${usuario}`;
    return this.http.delete(url, this.headers);
  }
}
