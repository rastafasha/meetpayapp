import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BackAreaComponent } from '../../../../shared/back-area/back-area.component';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { LoadingSimpleComponent } from '../../../../shared/loading-simple/loading-simple.component';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Preferencias } from '../../../../models/preferencias';
import { PreferenciasService } from '../../../../services/preferencias.service';
import { PlacesService } from '../../../../services/places.service';

@Component({
  selector: 'app-preferencias',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    RouterModule,
    LoadingSimpleComponent,
  ],
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.scss',
})
export class PreferenciasComponent {
  public isLoading: boolean = false;
  public user!: Usuario;
  public user_id!: string;
  public userPreferencias!: any;

  public ageRange!: number;
  public distanceRange!: number;

  preferenciaForm!: FormGroup;
  preferencia_selected!: Preferencias;
  userLocation:any = [];

  public gustos: any[] = [];
  public quiero: any[] = [];
  public title!: string;
  public title_quiero!: string;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private preferenciasService: PreferenciasService,
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private router: Router,
    // private paisService:PaisesService,
    private toastr: ToastrService
  ) {
    this.user = this.userService.getUser();
    this.loadUserLocation();
  }

  async loadUserLocation() {
    try {
      this.userLocation = await this.placeService.getUserLocation();
    } catch (error) {
      console.error('Error getting user location:', error);
      this.userLocation = [0, 0]; // Default coordinates
    }
  }

  ngOnInit() {
    this.userLocation = this.placeService.getUserLocation();
    this.validarFormularioPerfil();
    this.activatedRoute.params.subscribe(({ id }) => this.getUserProfile(id));
  }

  getUserProfile(id: string) {
    this.userService.getUserById(id).subscribe((res) => {
      this.userPreferencias = res;
      // console.log('usuarioServer',this.userProfile)
      // error => this.error = error;
    });
    this.activatedRoute.params.subscribe(({ id }) =>
      this.iniciarFormularioPerfil(id)
    );
  }

  iniciarFormularioPerfil(id: string) {
    this.isLoading = true;
    if (!id == null || !id == undefined || id) {
      this.preferenciasService.getByUserId(id).subscribe((res: any) => {
        this.preferenciaForm.patchValue({
          _id: res[0]._id,
          lang: res[0].lang,
          edad: res[0].edad,
          genero: res[0].genero,
          ciudad: res[0].ciudad,

          user: this.user.uid,
          img: res[0].img,
        });

        this.preferencia_selected = res[0];

        this.ageRange = res[0].edad;
        this.distanceRange = res[0].distancia;
        this.gustos =res[0].gustos,
        this.quiero = res[0].quiero,
        // console.log('preferencia_selected',this.preferencia_selected);
        this.isLoading = false;
      });
    } else {
      // this.pageTitle = 'Crear Perfil';
    }
  }

  validarFormularioPerfil() {
    this.preferenciaForm = this.fb.group({
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      lang: [''],
      distancia: [''],
      quiero: ['', Validators.required],
      gustos: ['', Validators.required],
      user: [this.user.uid],
      // id: [''],
    });
  }

  onGustosKeyUp(event: KeyboardEvent) {
    if (event.key === ',') {
      this.addGustos();
    }
  }

  addGustos() {
    if (!this.gustos) {
      this.gustos = [];
    }
    if (this.title) {
      // Remove trailing comma if present
      const cleanTitle = this.title.replace(/,\s*$/, '');
      if (cleanTitle) {
        this.gustos.push({
          title: cleanTitle
        });
        this.title = '';
      }
    }
  }

  deleteGusto(i:any){
    this.gustos.splice(i,1);
    this.title = '';
    
  }

  onQuieroKeyUp(event: KeyboardEvent) {
    if (event.key === ',') {
      this.addQuiero();
    }
  }

  addQuiero() {
    if (!this.quiero) {
      this.quiero = [];
    }
    if (this.title_quiero) {
      // Remove trailing comma if present
      const cleanTitle = this.title_quiero.replace(/,\s*$/, '');
      if (cleanTitle) {
        this.quiero.push({
          title_quiero: cleanTitle
        });
        this.title_quiero = '';
      }
    }
  }

  deleteQuiero(i:any){
    this.quiero.splice(i,1);
    this.title_quiero = '';
    
  }

  onAgeRange(value: any) {
    this.ageRange = value;
    this.preferenciaForm.patchValue({ preferencia_edad: value });
    // console.log('Age range changed to:', value);
  }
  ondistanceRange(value: any) {
    this.distanceRange = value;
    this.preferenciaForm.patchValue({ preferencia_distancia: value });
    // console.log(value);
  }

  cambiarLenguaje(lang: string) {
    // Update the form value
    this.preferenciaForm.patchValue({ lang });
    
    // If you need to trigger translation service updates:
    // this.translate.use(lang);
  }

  async onUserSavePreferencias() {
    const formData = new FormData();
    formData.append("usuario", this.user.uid+'');

    if (this.preferenciaForm.value.lang) {
      formData.append('lang', this.preferenciaForm.value.lang);
    }

    if (this.preferenciaForm.value.genero) {
      formData.append('genero', this.preferenciaForm.value.genero);
    }
    if (this.preferenciaForm.value.edad) {
      formData.append('edad', this.preferenciaForm.value.edad);
    }

    if (this.preferenciaForm.value.distancia) {
      formData.append('distancia', this.preferenciaForm.value.distancia);
    }

    if (!this.userLocation) {
      await this.loadUserLocation();
    }
    
    const data = {
      ...this.preferenciaForm.value,
      _id: this.preferencia_selected._id,
      gustos:this.gustos,
      quiero:this.quiero,
      latitude: this.userLocation[1],
      longitude: this.userLocation[0]
      // usuario: this.user.uid,
    };
    console.log(data);

    //si viene con datos
    if (this.preferencia_selected._id) {
      this.isLoading = true;
      this.preferenciasService
        .updatePreferencias(data,this.user.uid  )
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Preferencias actualizadas con éxito');
            this.isLoading = false;
            this.router.navigate(['/start-meet']);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error al actualizar preferencias');
          }
        );
    } else {
      this.isLoading = true;
      this.preferenciasService.createPreferencias(data).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Preferencias guardadas con éxito');
          this.isLoading = false;
          this.router.navigate(['/start-meet']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error al guardar preferencias');
        }
      );
    }
  }
}
