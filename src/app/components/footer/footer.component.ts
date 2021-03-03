import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public status = false;
  constructor(public wsService: WebsocketService, public ref: ChangeDetectorRef) {
   }

  ngOnInit(): void {
  // Subscribcion a observable con el estado actual de la conexion al servidor
   this.wsService.isConnectedObs.subscribe(socket => this.status = socket);
  }

}

