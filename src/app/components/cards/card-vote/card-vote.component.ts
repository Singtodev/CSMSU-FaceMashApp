import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-card-vote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-vote.component.html',
  styleUrl: './card-vote.component.scss',
})
export class CardVoteComponent {
  @Input() image: string = '';
  @Input() score: string = '';
  @Input() rank: string = '';
  @Input() elo: string = '';
  @Input() id: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  goDetail() {
    if (this.auth.currentUserValue != null) {
      this.router.navigate(['picture-detail/' + this.id]);
    }
  }
}
