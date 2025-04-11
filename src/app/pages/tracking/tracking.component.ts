import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ChatComponent } from "../chat/chat.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tracking',
  imports: [HeaderComponent,  RouterModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {

}
