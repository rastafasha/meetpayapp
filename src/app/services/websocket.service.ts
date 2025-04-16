import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { UsuarioChat } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario?: UsuarioChat;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    console.log('Socket instance:', this.socket); // Log the socket instance
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // Emit any event
  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo', evento);
    this.socket.emit(evento, payload, callback); // Emit event to the server
  }

  // Listen to any event
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    console.log('Configurando', nombre);

    return new Promise<void>((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp: any) => {
        this.usuario = new UsuarioChat(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWs() {
    this.usuario;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    }
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      const usuarioData = localStorage.getItem('usuario');
      if (usuarioData) {
        this.usuario = JSON.parse(usuarioData);
      }
      if (this.usuario && this.usuario.nombre) {
        this.loginWS(this.usuario.nombre);
      }
    }
  }
}