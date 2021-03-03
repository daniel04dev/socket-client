import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import socket from '../sockets/socket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  // Cracion de un behavior subject para almacenar el estado de la conexion
  // Subject: Pueden actuar como observable y como observer
  // Behavior subject: Permite recordar el ultimo valor emitido a todas las subscripciones, permite definir valor inicial
  private socketStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isConnectedObs: Observable<boolean> = this.socketStatus.asObservable();

  public Usuario = new Usuario('');

  constructor()
   {
     this.checkStatus();
     this.cargarStorage();
   }

  checkStatus(): any {
    // Deteccion de conexion y desconeccion al servidor
    socket.on('connect', () => {
      this.socketStatus.next(true);
      console.log('Conectado al servidor' + this.socketStatus.value);
    });

    socket.on('disconnect', () => {
      this.socketStatus.next(false);
      console.log('Desconectado del servidor' + this.socketStatus);
    });
  }

  // Emite cualquier evento
  emit(evento: string, payload?: any, callback?: Function): void {
    socket.emit( evento, payload, callback );
  }

  // Escucha cualquier evento del servidor
  listen( evento: string ): Observable<any> {
    // Retorna un observable para estar pendientes a las emisiones del servidor
    return new Observable( (subscriber) => {
      socket.on(evento, (data: any ) => {
        subscriber.next(data);
      });
    });
  }

  // Login WebSocket
  loginWS( nombre: string ): Promise<any> {

    return new Promise( (resolve, reject) => {

      // Llama metodo configurado para emision de eventos
      this.emit( 'configurar-usuario', { nombre }, ( resp: any ) => {

        // Una vez configurado el usuario se crea nueva instancia de usuario y se guarda en local storage
        this.Usuario = new Usuario( nombre );
        this.guardarStorage();
        resolve(resp);
      });
    });
  }

  // Obtener Usuario
  getUsuario(): boolean {
    if (this.Usuario.nombre === '') {
      return false;
    } else {
      return true;
    }
  }

  // Guarda informacion en local storage en caso de reconexion
  guardarStorage(): void {
    localStorage.setItem( 'usuario', JSON.stringify( this.Usuario ));
  }

  // Verifica si hay un usuario almacenado en local storage y de ser asi crea nuevo usuario
  cargarStorage(): void {
      const user = localStorage.getItem('usuario');
      if(user != null) {
        // Asigna usuario a la instancia
        this.Usuario = JSON.parse(user);
        // Vuelve a registrar al usuario en el servidor por medio de login
        this.loginWS( this.Usuario.nombre );

      }
  }
}
