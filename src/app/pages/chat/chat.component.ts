import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-chat',
  imports: [HeaderComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChatComponent {

}
