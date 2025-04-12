import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { RegistroComponent } from './registro/registro.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordresetComponent,
    NewpasswordComponent,
    RegistroComponent,
  ],
  exports: [
    LoginComponent,
    PasswordresetComponent,
    NewpasswordComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ]
})
export class AuthModule { }
