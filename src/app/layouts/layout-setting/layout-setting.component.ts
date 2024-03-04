import { Component } from '@angular/core';
import { SettingNavigateComponent } from '../../components/setting-navigate/setting-navigate.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-setting',
  standalone: true,
  imports: [SettingNavigateComponent , RouterOutlet],
  templateUrl: './layout-setting.component.html',
  styleUrl: './layout-setting.component.scss'
})
export class LayoutSettingComponent {

}
