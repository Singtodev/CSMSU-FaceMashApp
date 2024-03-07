import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ToprankComponent } from './pages/toprank/toprank.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SettingGalleryComponent } from './pages/setting-gallery/setting-gallery.component';
import { SettingReportComponent } from './pages/setting-report/setting-report.component';
import { SettingVotelogComponent } from './pages/setting-votelog/setting-votelog.component';
import { SettingGalleryAddComponent } from './pages/setting-gallery-add/setting-gallery-add.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { LayoutSettingComponent } from './layouts/layout-setting/layout-setting.component';
import { SettingGalleryEditComponent } from './pages/setting-gallery-edit/setting-gallery-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'picture-detail/:id',
    component: PictureDetailComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'setting',
  //   component: SettingComponent,
  // },
  {
    path: 'setting',
    component: LayoutSettingComponent,
    children: [
      {
        path: '',
        component: SettingComponent,
      },
      {
        path: 'gallery',
        component: SettingGalleryComponent,
      },
      {
        path: 'gallery/add',
        component: SettingGalleryAddComponent,
      },
      {
        path: 'gallery/edit/:id',
        component: SettingGalleryEditComponent,
      },
      {
        path: 'report',
        component: SettingReportComponent,
      },
      {
        path: 'votelog',
        component: SettingVotelogComponent,
      },
    ],
  },
  {
    path: 'toprank',
    component: ToprankComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
