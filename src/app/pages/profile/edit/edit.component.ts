import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pais } from '../../../models/pais';
import { PaisesService } from '../../../services/paises.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { LoadingSimpleComponent } from "../../../shared/loading-simple/loading-simple.component";
import { BackAreaComponent } from '../../../shared/back-area/back-area.component';

@Component({
  selector: 'app-edit',
  imports: [HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgIf,
    NgFor,
    CommonModule,
    RouterModule,
    // LoadingComponent, 
    LoadingSimpleComponent,
    BackAreaComponent
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
  paises:Pais[]=[];
  
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
      private paisService:PaisesService,
      private toastr: ToastrService
    ){
      this.user = this.userService.getUser();
    }

    ngOnInit(){
      window.scrollTo(0, 0);
      this.validarFormularioPerfil();
      this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
      this.getPaisList()
    }

    getPaisList(){
      this.paisService.getPaises().subscribe((resp:any)=>{
        // console.log(resp);
        this.paises = resp;
      })
    }

    getUserProfile(id:string){
      this.userService.getUserById(id).subscribe(
        res =>{
          this.userProfile = res;
          // console.log('usuarioServer',this.userProfile)
          // error => this.error = error;
        }
      );
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
  
    }

    iniciarFormularioPerfil(id:string){
      this.isLoading = true;
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

            this.ageRange = res.preferencia_edad;
            this.distanceRange = res.preferencia_distancia;
            // console.log('user_selected',this.user_selected);
            this.isLoading = false;
  
          }
  
        );
      } else {
        // this.pageTitle = 'Crear Perfil';
      }

    }

    validarFormularioPerfil(){
      this.userForm = this.fb.group({
        first_name: ['', Validators.required],
        email: [this.user.email],
        last_name: ['', Validators.required],
        edad: ['', Validators.required],
        pais: [''],
        lang: [''],
        ciudad: [''],
        telefono: ['', Validators.required],
        direccion: [''],
        google: [''],
        facebook: [''],
        twitter: [''],
        numdoc: [''],
        genero: [''],
        descripcion: ['', Validators.required],
        preferencia_edad: [''],
        preferencia_distancia: [''],
        preferencia_lang: [''],
        preferencia_sexo: [''],
        usuario: [this.user.uid],
        // id: [''],
      });

      
    }

    onUserSave(){

      const formData = new FormData();
      formData.append("email", this.user.email);
      // formData.append("usuario", this.user.uid+'');
      // formData.append("role", 'USER');

      if (this.userForm.value.first_name) {
      formData.append("first_name", this.userForm.value.first_name);
      
    }
      if (this.userForm.value.last_name) {
      formData.append("last_name", this.userForm.value.last_name);
      
    }
      
      if (this.userForm.value.numdoc) {
      formData.append("numdoc", this.userForm.value.numdoc);
      
    }
      if (this.userForm.value.genero) {
      formData.append("genero", this.userForm.value.genero);
      
    }
      if (this.userForm.value.direccion) {
      formData.append("direccion", this.userForm.value.direccion);
      
    }
      if (this.userForm.value.descripcion) {
      formData.append("descripcion", this.userForm.value.descripcion);
      
    }
      if (this.userForm.value.edad) {
      formData.append("edad", this.userForm.value.edad);
      
    }
      if (this.userForm.value.lang) {
      formData.append("lang", this.userForm.value.lang);
      
    }
      if (this.userForm.value.pais) {
      formData.append("pais", this.userForm.value.pais);
      
    }
      if (this.userForm.value.ciudad) {
      formData.append("ciudad", this.userForm.value.ciudad);
      
    }
      if (this.userForm.value.telefono) {
      formData.append("telefono", this.userForm.value.telefono);
      
    }
    
      if (this.userForm.value.google) {
      formData.append("google", this.userForm.value.google);
      
    }
    
      if (this.userForm.value.facebook) {
      formData.append("facebook", this.userForm.value.facebook);
      
    }
      
      if (this.userForm.value.preferencia_edad) {
      formData.append("preferencia_edad", this.userForm.value.preferencia_edad);
      
    }
      if (this.userForm.value.preferencia_distancia) {
      formData.append("preferencia_distancia", this.userForm.value.preferencia_distancia);
      
    }
      if (this.userForm.value.preferencia_lang) {
      formData.append("preferencia_lang", this.userForm.value.preferencia_lang);
      
    }
      if (this.userForm.value.preferencia_sexo) {
      formData.append("preferencia_sexo", this.userForm.value.preferencia_sexo);
      
    }

    const data = {
      ...this.userForm.value,
      // usuario: this.user.uid,
    }
    console.log(data);
    
    this.userService.updateProfile(data, this.user.uid).subscribe((resp:any)=>{
      console.log(resp);
      this.toastr.success('Actualizado!', 'Ya conocer');
    })
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
      // console.log('Age range changed to:', value);
    }
    ondistanceRange(value:any){
      this.distanceRange = value;
      this.userForm.patchValue({preferencia_distancia: value});
      // console.log(value);
    }
}
