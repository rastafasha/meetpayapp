import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [HeaderComponent,
    ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NgIf,
        NgFor
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class EditComponent {
  public user!: Usuario;
  option_selected:number = 1;
  solicitud_selected:any = null;
  contacts:Array <any> = [];
  paises:Array <any> = [];

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('Caracas'),
    age: new FormControl('',[Validators.required, Validators.minLength(3)]),
    pais: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    zipCode: new FormControl(''),
    isAgree: new FormControl(false),

    });

  preferenciaForm: FormGroup = new FormGroup({
    gender: new FormControl('', [Validators.required]),
    distance: new FormControl('',[Validators.required, Validators.minLength(3)]),
    age: new FormControl('',[Validators.required, Validators.minLength(3)]),
    

  });
  constructor(
      private fb: FormBuilder,
      private authService: UserService,
    ){
      this.user = this.authService.getUser();
    }

    ngOnInit(){
      this.validarFormularioPerfil();
    }

    validarFormularioPerfil(){
      this.userForm = this.fb.group({
        nombre: ['', Validators.required],
        surname: ['', Validators.required],
        pais: [''],
        estado: [''],
        ciudad: [''],
        telhome: ['', Validators.required],
        telmovil: ['', Validators.required],
        speciality_id: ['', Validators.required],
        direccion: [''],
        n_doc: [''],
        gender: [''],
        description: ['', Validators.required],
        usuario: [this.user._id],
        id: [''],
      });
    }

    onUserSave(){}

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
}
