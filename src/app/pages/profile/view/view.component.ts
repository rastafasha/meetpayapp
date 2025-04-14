import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SliderGalleryComponent } from '../../../components/slider-gallery/slider-gallery.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackAreaComponent } from '../../../shared/back-area/back-area.component';
import { FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/user';

@Component({
  selector: 'app-view',
  imports: [HeaderComponent, SliderGalleryComponent,
    RouterModule, BackAreaComponent,
    TranslateModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

public user!: Usuario;
public user_selected!:any;
public users!:any;

langs: string[] = [];
  public activeLang = 'es';
  flag = false;
  lang!:string;
  id!:string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    

  ){
    this.user = this.authService.getUser();

    this.translate.setDefaultLang('en');
    // this.translate.setDefaultLang(this.activeLang);
    this.translate.use('en');
    this.translate.addLangs(["es", "en"]);
    this.langs = this.translate.getLangs();
    this.translate.get(this.langs).subscribe(res =>{
      // console.log(res);
    })
  }

  ngOnInit(){
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.getUserLocal(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }
  
  getUserLocal(id:string){
    console.log(id);
    this.userService.getUsersLocal().subscribe((resp:any)=>{
      console.log(resp);
      this.users = resp.users;
      //filtramos el usuario seleccionado
      this.user_selected = this.users.find((user: any) => user.uid === id);
      console.log(this.user_selected);
    })
  }

  getUserProfile(id:string){
    // this.isLoading = true;
    if (!id == null || !id == undefined || id) {
      this.userService.getUserById(id).subscribe(
        (res:any) => {
          this.user_selected = res;
          console.log(res);

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
