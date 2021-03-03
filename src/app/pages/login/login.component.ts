import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(public wsService: WebsocketService, public router: Router) {
  }

  ngOnInit(): void {
  }

  ingresar(): void {
    // Llama al metodo encargado de configurar usuario en servidor
    this.wsService.loginWS(this.nombre)
    .then( (resp) => {
      console.log(resp);
      // Redirecciona a pantalla mensajes

      this.router.navigateByUrl('/mensajes');

    });
  }

}
