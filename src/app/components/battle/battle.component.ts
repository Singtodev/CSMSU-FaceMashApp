import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
})
export class BattleComponent {
  constructor(private auth: AuthService) {}

  public vote(id: number) {
    if (this.auth.currentUserValue != null) {
      return alert(id);
    }

    return alert('not login');
  }



}
