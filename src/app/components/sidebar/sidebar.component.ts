import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate , state } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardVoteComponent } from '../cards/card-vote/card-vote.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule , FormsModule , CardVoteComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
  ],
})
export class SidebarComponent {

  @Input() isOpen: boolean = false;
  @Output() closeEvent = new EventEmitter<any>();
  

  public sendEventClose(){
    this.closeEvent.emit();
  }

}
