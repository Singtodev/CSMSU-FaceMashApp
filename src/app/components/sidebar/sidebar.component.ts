import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardVoteComponent } from '../cards/card-vote/card-vote.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, CardVoteComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [],
})
export class SidebarComponent implements OnInit {
  constructor(private fmapi: FacemashApiService , private router : Router) {}

  public pictures: any = [];

  ngOnInit(): void {
    this.loadUserPictures();
  }

  public loadUserPictures(){
    this.fmapi.getMePicture().subscribe((data)=> {
        this.pictures = data;
    })
  }

  @Input() isOpen: boolean = false;
  @Output() closeEvent = new EventEmitter<any>();

  public sendEventClose() {
    this.closeEvent.emit();
  }

  public goAdd(){
    this.router.navigate(['gallery/add'])
  }
}
