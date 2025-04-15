import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SOCKET_INSTANCE } from '../app.config';
import { environment } from '../environments/environment';
import { io } from 'socket.io-client';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // public socket = io(environment.soketServer);

  constructor(
    // private socket : Socket,
    @Inject(SOCKET_INSTANCE) private socket: Socket
  ) { }

  public sendMessage(message:string){
    // console.log('Socket instance:', this.socket);
    this.socket.emit('send_message', message);
    
  }
  public listMessage(){
    return this.socket.fromEvent('received').pipe(map((data)=>data));
  }
}
