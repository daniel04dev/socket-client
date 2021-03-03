import { Component, OnDestroy, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensajesSubscription: Subscription;
  elemento: HTMLElement;
  mensajes: any[] = [];

  constructor(public chatService: ChatService, public ref: ChangeDetectorRef) {
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
    // Subscripcion a observable con el mensaje que emite el servidor
    this.mensajesSubscription = this.chatService.getMessage().subscribe( (msg) => {
      console.log(msg);
      this.mensajes.push(msg);
      this.ref.detectChanges();

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 150);
    });
   }

   ngOnInit(): void {
     // Obtiene elemento con mensajes del documento
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
    console.log('hola' + this.elemento);
   }

  ngOnDestroy(): void {
    // Unsubscribe a la emision del servidor cuando el componente es destruido
    this.mensajesSubscription.unsubscribe();
  }

  enviar(): void {

    // Valida que no haya mensajes en blanco
    if (this.texto.trim().length === 0){
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
