import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserContact } from '../../../../models/user-contact';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';
import { UserContactService } from '../../../../services/user-contact.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSimpleComponent } from '../../../../shared/loading-simple/loading-simple.component';
import { Usuario } from '../../../../models/user';

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    RouterModule,
    LoadingSimpleComponent,
    NgFor
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  public isLoading:boolean = false;
  usercontacts: UserContact[]=[];
  user!: Usuario;
  user_list!: any;

  private authService = inject(AuthService);
  private userContactService = inject(UserContactService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  

  ngOnInit(){
    // this.user = this.authService.getUser();
    this.getContactsbyUser();
  }

  getContactsbyUser(){
    this.isLoading = true;
    this.userContactService.getByUserId(this.authService.getUser().uid).subscribe((resp:any)=>{
      this.usercontacts = resp || [];
      
      // console.log(resp);
      this.isLoading = false;
      
      // buscamos los ids de los usuarios para mostrar el nombre y correo
      this.user_list = this.usercontacts.map((user:UserContact)=>{
        return {
          uid: user.user.uid,
          first_name: user.user.first_name,
          last_name: user.user.last_name,
          email: user.user.email,
          genero: user.user.genero,
          }
        });
    })
  }

 

  showUser(){}

  deleteContact(userl:any){
    this.isLoading = true;
    this.userContactService.deleteById(userl).subscribe((resp:any)=>{
      this.getContactsbyUser();
      this.isLoading = false;
      })
  }
}
