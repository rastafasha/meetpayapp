import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pais } from '../../../models/pais';
import { PaisesService } from '../../../services/paises.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { LoadingSimpleComponent } from "../../../shared/loading-simple/loading-simple.component";
import { BackAreaComponent } from '../../../shared/back-area/back-area.component';
import { PreferenciasComponent } from "../components/preferencias/preferencias.component";
import { PlacesService } from '../../../services/places.service';
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
    BackAreaComponent, PreferenciasComponent
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
  userLocation:any = [];

  longitude!:number;
  latitude!:number;

  langs: string[] = [];
  public activeLang = 'es';
  flag = false;
  lang!:string;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private paisService:PaisesService,
      private placeService:PlacesService,
      private toastr: ToastrService,
      private translate: TranslateService,

    ){
      this.user = this.userService.getUser();
      this.loadUserLocation();

      this.translate.setDefaultLang('en');
      // this.translate.setDefaultLang(this.activeLang);
      this.translate.use('en');
      this.translate.addLangs(["es", "en"]);
      this.langs = this.translate.getLangs();
      this.translate.get(this.langs).subscribe(res =>{
        // console.log(res);
      })
    }

    async loadUserLocation() {
      try {
        this.userLocation = await this.placeService.getUserLocation();
        // console.log('User location loaded:', this.userLocation);
        // console.log(this.userLocation[0]);
        // console.log(this.userLocation[1]);
      } catch (error) {
        console.error('Error getting user location:', error);
        this.userLocation = [0, 0]; // Default coordinates
      }
    }

    ngOnInit(){
      window.scrollTo(0, 0);
      this.validarFormularioPerfil();
      this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
      this.getPaisList();
    }

    public cambiarLenguaje(lang:any) {
      this.activeLang = lang;
      this.translate.use(lang);
      this.flag = !this.flag;
      localStorage.setItem('lang', this.activeLang);
      this.userForm.patchValue({ lang: lang });
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
              usuario: this.user.uid,
              img: res.img
            });

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
       
        usuario: [this.user.uid],
        // id: [''],
      });

      
    }

    async onUserSave(){

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

    if (!this.userLocation) {
      await this.loadUserLocation();
    }
    
    const data = {
      ...this.userForm.value,
      latitude: this.userLocation?.[1] || 0,
      longitude: this.userLocation?.[0] || 0
    }
    // console.log(data);
    this.isLoading = true;
    
    this.userService.updateProfile(data, this.user.uid).subscribe({
      next: (resp: any) => {
        console.log('Profile update response:', resp);
        this.toastr.success('Perfil actualizado correctamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Profile update error:', err);
        this.toastr.error('Error al actualizar el perfil', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.isLoading = false;
      }
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
