import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [HeaderComponent,
    ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NgIf,
        NgFor,
        CommonModule,
        RouterModule
        
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  public option_selected:number = 1;
  public solicitud_selected:any = null;
  public isLoading:boolean = false;

  public user!: Usuario;
  public user_id!: string;
  
  contacts:Array <any> = [];
  paises:Array <any> = [];
  
  public user_selected:any = null;
  public userProfile!:Usuario;
  public _id!:string;
  public uid!:string;

  public ageRange!:number ;
  public distanceRange!:number;

  userForm!: FormGroup;
  preferenciaForm!: FormGroup;
// value: any;
  // userForm: FormGroup = new FormGroup({
  //   first_name: new FormControl('', [Validators.required]),
  //   last_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
  //   userName: new FormControl('', [Validators.email, Validators.required]),
  //   city: new FormControl('Caracas'),
  //   age: new FormControl('',[Validators.required, Validators.minLength(3)]),
  //   pais: new FormControl(''),
  //   gender: new FormControl('', [Validators.required]),
  //   zipCode: new FormControl(''),
  //   isAgree: new FormControl(false),

  //   });

  // preferenciaForm: FormGroup = new FormGroup({
  //   preferencia_sexo: new FormControl('', [Validators.required]),
  //   distance: new FormControl('',[Validators.required, Validators.minLength(3)]),
  //   age: new FormControl('',[Validators.required, Validators.minLength(3)]),
    

  // });
  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
    ){
      this.user = this.userService.getUser();
    }

    ngOnInit(){
      this.validarFormularioPerfil();
      this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
      
    }

    getUserProfile(id:string){
      this.userService.getUserById(id).subscribe(
        res =>{
          this.userProfile = res;
          console.log('usuarioServer',this.userProfile)
          // error => this.error = error;
        }
      );
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
  
    }

    iniciarFormularioPerfil(id:string){
      if (!id == null || !id == undefined || id) {
        this.userService.getUserById(id).subscribe(
          (res:any) => {
            this.userForm.patchValue({
              _id: res._id,
              first_name: res.first_name,
              last_name: res.last_name,
              pais: res.pais,
              lang: res.lang,
              edad: res.edad,
              genero: res.genero,
              ciudad: res.ciudad,
              telefono: res.telefono,
              direccion: res.direccion,
              descripcion: res.descripcion,
              numdoc: res.numdoc,
              facebook: res.facebook,
              google: res.google,
              instagram: res.instagram,
              twitter: res.twitter,
              linkedin: res.linkedin,

              preferencia_sexo: res.preferencia_sexo,
              preferencia_lang: res.preferencia_lang,
              preferencia_edad: res.preferencia_edad,
              preferencia_distancia: res.preferencia_distancia,

              usuario: this.user.uid,
              img: res.img
            });

            // this.preferenciaForm.patchValue({
            //   preferencia_sexo: res.preferencia_sexo,
            //   preferencia_lang: res.preferencia_lang,
            //   preferencia_edad: res.preferencia_edad,
            // });
            this.user_selected = res;
            console.log('user_selected',this.user_selected);
  
          }
  
        );
      } else {
        // this.pageTitle = 'Crear Perfil';
      }

    }

    validarFormularioPerfil(){
      this.userForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        edad: ['', Validators.required],
        pais: [''],
        lang: [''],
        ciudad: [''],
        telefono: ['', Validators.required],
        direccion: [''],
        google: [''],
        facebook: [''],
        instagram: [''],
        twitter: [''],
        linkedin: [''],
        numdoc: [''],
        genero: [''],
        descripcion: ['', Validators.required],
        preferencia_edad: [''],
        preferencia_distancia: [''],
        preferencia_lang: [''],
        preferencia_sexo: [''],
        usuario: [this.user._id],
        id: [''],
      });

      
    }

    onUserSave(){
      const formValue = this.userForm.value;

    // const data ={
    //   redessociales: this.redessociales,
    //   precios: this.tarifas,

    //   nombre: formValue.nombre,
    //   apellidos: formValue.apellidos,
    //   pais: formValue.pais,
    //   estado: formValue.estado,

    //   ciudad: formValue.ciudad,
    //   telhome: formValue.telhome,
    //   telmovil: formValue.telmovil,
    //   shortdescription: formValue.shortdescription,
    //   usuario: this.user.id,
    //   id: formValue.id,
    //   user_id :this.user_id,
    //   profile_id :this.profile_id,
    //   // img: this.profile.img,
    //   // imagen: this.FILE_AVATAR.,
    //   avatar: this.FILE_AVATAR.name,
    //   ...this.userForm.value,

      
    // }

    console.log(formValue);
    // console.log(data);
    }

    optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        this.ngOnInit();
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
        // this.getClientesbyuser();
        // this.getClientesbyuser();
        
        
      }
    }

    onAgeRange(value:any){
      this.ageRange = value;
      this.userForm.patchValue({preferencia_edad: value});
      console.log('Age range changed to:', value);
    }
    ondistanceRange(value:any){
      this.distanceRange = value;
      this.userForm.patchValue({preferencia_distancia: value});
      console.log(value);
    }
}
