import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Picture } from '../../types/picture_model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoteCooldownService } from '../../services/vote-cooldown.service';

import Toastify from 'toastify-js';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
})
export class BattleComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private fmapi: FacemashApiService,
    private votecd: VoteCooldownService
  ) {}

  public pictures: any[] = [];

  ngOnInit(): void {
    this.loadRandomPictures();
  }

  loadRandomPictures(): void {
    // remove expire cooldown
    this.votecd.removeExpiredCooldowns();
    let cooldownItems = [...this.votecd.getAllCooldowns().keys()];

    // fetching
    this.fmapi.randomPictures(cooldownItems).subscribe(
      (data: Picture[]) => {
        this.pictures = data;
      },
      (error) => {
        if (
          error.error.code === 'Unauthorized' &&
          error.error.msg == 'jwt expired'
        ) {
          window.location.reload();
        }
      }
    );
  }


  getPlayer(id: number){
    return this.pictures[id]?.name.length > 20 ? this.pictures[id]?.name.slice(0,21) + "...." : this.pictures[id]?.name ?? '';
  }

  public vote(id: any) {
    let opponentId:any = this.pictures.filter((item) => item.pid != id)[0].pid;
    if (this.auth.currentUserValue != null) {
      this.votecd.findCooldown(id);
      let uid: any = this.auth.currentUserValue.uid;
      this.fmapi.vote(uid, id, opponentId).subscribe((data) => {
        if (data.affectedRows === 1) {
          Toastify({
            text: 'Vote Success !',
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
            onClick: function () {},
          }).showToast();
        }
      });
      return this.loadRandomPictures();
    }
    return Toastify({
      text: 'Please login ! ',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #B00000, #C9C03D)',
      },
      onClick: function () {},
    }).showToast();
  }

  public goToTopRank() {
    this.router.navigate(['toprank']);
  }
}
