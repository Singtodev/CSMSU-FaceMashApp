import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ToprankComponent } from './pages/toprank/toprank.component';
import { SettingComponent } from './pages/setting/setting.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'setting',
        component: SettingComponent
    },
    {
        path: 'toprank',
        component: ToprankComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];
