import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { BackAreaComponent } from '../../shared/back-area/back-area.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  imports: [HeaderComponent, BackAreaComponent,
    NgIf, NgFor, FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChatComponent {

  public message:string = '';
  public messages:any =[];
  public user_selected!:any;
  

  constructor( 
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    this.listMessage();
  }

  public sendMessage(){
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message)
    this.message = '';
  }
  public listMessage(){
    this.chatService.listMessage().subscribe((data:any)=>{
      console.log(data);
      this.messages.push(data.data);
    })
  }

  
  getUserProfile(id:string){
    // this.isLoading = true;
    if (!id == null || !id == undefined || id) {
      this.userService.getUserById(id).subscribe(
        (res:any) => {
          this.user_selected = res;
          // console.log(res);

          // this.ageRange = res.preferencia_edad;
          // this.distanceRange = res.preferencia_distancia;
          // // console.log('user_selected',this.user_selected);
          // this.isLoading = false;

        }

      );
    } else {
      // this.pageTitle = 'Crear Perfil';
    }

  }
}
