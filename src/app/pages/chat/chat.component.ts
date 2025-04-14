import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { BackAreaComponent } from '../../shared/back-area/back-area.component';

@Component({
  selector: 'app-chat',
  imports: [HeaderComponent, BackAreaComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChatComponent {

}
