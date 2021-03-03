import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string ): void{

    const payload = {
      de: this.wsService.Usuario.nombre,
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload );
  }

  getMessage(): Observable<any> {
    // Esto obtiene el observable del wsService y define el evento a escuchar
    return this.wsService.listen('mensaje-nuevo');
  }

  getPrivateMessage(): Observable<any> {
    // Esto obtiene el observable del wsService y define el evento a escuchar
    return this.wsService.listen('mensaje-privado');
  }
}
