import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BattleComponent } from '../../components/battle/battle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent , BattleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
