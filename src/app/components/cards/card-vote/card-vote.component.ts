import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  goDetail() {
    this.router.navigate(['picture-detail/' + this.id]);
  }
}
