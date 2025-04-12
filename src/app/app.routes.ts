import { Routes } from '@angular/router';
import { StartMeetComponent } from './pages/start-meet/start-meet.component';
import { ViewComponent } from './pages/profile/view/view.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { AnalizadorComponent } from './pages/analizador/analizador.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GaleriaComponent } from './pages/profile/galeria/galeria.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'start-meet', component: StartMeetComponent},
    {path: 'profile-view', component: ViewComponent},
    {path: 'myprofile', component: EditComponent},
    {path: 'myprofile/:id', component: EditComponent},
    {path: 'profile-gallery', component: GaleriaComponent},
    {path: 'analizer', component: AnalizadorComponent},
    {path: 'tracking', component: TrackingComponent},
    {path: 'chat', component: ChatComponent},
    

    {path: '**', redirectTo: '', pathMatch: 'full'},
];

