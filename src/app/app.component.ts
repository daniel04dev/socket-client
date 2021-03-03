import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Basico';

  constructor(
    private wsService: WebsocketService, private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Subscripcion al observable pendiente de mensajes privadod
    this.chatService.getPrivateMessage().subscribe( msg => {
      console.log(msg);
    });
  }

}
