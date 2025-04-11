import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ModalfooterComponent } from '../../components/modalfooter/modalfooter.component';
import { UsersRamdomService } from '../../services/users-ramdom.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-meet',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './start-meet.component.html',
  styleUrl: './start-meet.component.scss'
})
export class StartMeetComponent implements OnInit {
  private isToggled = false;
  value:any;
  constructor(
    private renderer: Renderer2,
     private el: ElementRef,
     private userRandomService:UsersRamdomService
    ) {}

  ngOnInit(): void {
    // const pinElement = this.el.nativeElement.querySelector('#pin');
    // if (pinElement) {
    //   this.renderer.listen(pinElement, 'click', () => this.toggleClasses());
    // }
    this.getUsers();
    this.getUsersbyGender();
  }

  toggleClasses(value:any): void {
    this.value = value;
    this.isToggled = !this.isToggled;
    const quehacer = this.el.nativeElement.querySelector('.quehacer');

    if (quehacer) {
      if (this.isToggled) {
        this.renderer.addClass(quehacer, 'mostrar-quehacer');
      } else {
        this.renderer.removeClass(quehacer, 'mostrar-quehacer');
      }
    }
    
  }

  getUsers(){
    this.userRandomService.getCharacters().subscribe((resp:any)=>{
      console.log(resp);
    })
  }
  getUsersbyGender(){
    this.userRandomService.getCharactersGender().subscribe((resp:any)=>{
      console.log(resp);
    })
  }
}
