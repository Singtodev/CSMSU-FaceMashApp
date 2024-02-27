import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-vote',
  standalone: true,
  imports: [],
  templateUrl: './card-vote.component.html',
  styleUrl: './card-vote.component.scss'
})
export class CardVoteComponent {


  @Input() image: string = "";
  @Input() score: string = "";
}
