import { Routes } from '@angular/router';
import { StartMeetComponent } from './pages/start-meet/start-meet.component';
import { ViewComponent } from './pages/profile/view/view.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { AnalizadorComponent } from './pages/analizador/analizador.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GaleriaComponent } from './pages/profile/galeria/galeria.component';


export const routes: Routes = [
    {path: '', component: StartMeetComponent},
    // {path: 'login', component: LoginComponent},
    
    // {path: 'favorites', component: FavoritesComponent},
    // {path: 'search', component: SearchComponent},

    // {path: 'especialidades', component: CategoriaComponent},
    // {path: 'especialidad/:id', component: CategoriaComponent},
    // {path: 'especialista/:id', component: EspecialistaComponent},

    
    //user
    {path: 'profile-view', component: ViewComponent},
    // {path: 'profile/settings', component: SettingsComponent},
    {path: 'myprofile', component: EditComponent},
    {path: 'profile-gallery', component: GaleriaComponent},
    // {path: 'profile/documents', component: DocumentsComponent},
    // {path: 'profile/documents/file/:id', component: FilesComponent},
    {path: 'analizer', component: AnalizadorComponent},
    {path: 'tracking', component: TrackingComponent},
    {path: 'chat', component: ChatComponent},
    
    // {path: 'profile/paymentmethods', component: PaymentmethodComponent},
    
    // {path: 'admin/banners', component: BannerComponent},

    //wallet
    // {path: 'wallet', component: WalletComponent},
    // {path: 'wallet-payment', component: PaymentComponent},
    // {path: 'orders', component: OrderComponent},

    {path: '**', redirectTo: '', pathMatch: 'full'},
];

