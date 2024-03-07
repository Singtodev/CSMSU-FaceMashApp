import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardVoteComponent } from '../../components/cards/card-vote/card-vote.component';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toprank',
  standalone: true,
  imports: [NavbarComponent, CardVoteComponent, CommonModule, FormsModule],
  templateUrl: './toprank.component.html',
  styleUrl: './toprank.component.scss',
})
export class ToprankComponent implements OnInit {
  public pictures: any[] = [];
  public dateRanks: any[] = [];
  public topTen: any[] = [];

  constructor(private fmapi: FacemashApiService, private location: Location) {}
  ngOnInit(): void {
    this.loadPictures();
    // this.loadDatePick();
  }

  convertToLocaleDate(isoDateTimeStr: string) {
    // Parse the input string into a Date object
    var dateObj = new Date(isoDateTimeStr);

    // Get the local time zone offset in minutes
    var localOffset = dateObj.getTimezoneOffset();

    // Convert UTC time to local time
    var localTime = new Date(dateObj.getTime() + localOffset * 60000);

    // Extract date components
    var day = localTime.getDate();
    var monthIndex = localTime.getMonth();
    var year = localTime.getFullYear();

    // Define month names array
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Format the date part of the output string
    var formattedDate =
      day.toString().padStart(2, '0') +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year.toString().padStart(4, '0');

    return formattedDate;
  }

  loadPictures() {
    this.fmapi.getAllPictures().subscribe((data) => {
      this.pictures = data;
      this.topTen = data.length > 10 ? data.slice(0,10) : data;
    });
  }

  // loadDatePick() {
  //   this.fmapi.getDateRank().subscribe((data) => {
  //     this.dateRanks = data;
  //   });
  // }

  goBack() {
    this.location.back();
  }
}
