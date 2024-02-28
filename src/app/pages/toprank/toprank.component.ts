import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toprank',
  standalone: true,
  imports: [NavbarComponent , CardVoteComponent ,CommonModule , FormsModule ],
  templateUrl: './toprank.component.html',
  styleUrl: './toprank.component.scss'
})
export class ToprankComponent implements OnInit {

  public pictures: any[] = [];

  constructor(private fmapi: FacemashApiService , private location: Location){
    
  }
  ngOnInit(): void {
    this.loadPictures();
  }

  loadPictures(){
    this.fmapi.getAllPictures().subscribe((data)=> {
      this.pictures = data;
    })
  }


  goBack(){
    this.location.back();
  }

}
