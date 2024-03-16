import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { Picture } from '../../types/picture_model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoteCooldownService } from '../../services/vote-cooldown.service';

import Toastify from 'toastify-js';
import Swal from 'sweetalert2';
import { EloratingrankService } from '../../services/eloratingrank.service';

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
    private votecd: VoteCooldownService,
    private elorating: EloratingrankService
  ) {}

  public pictures: any[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.loadRandomPictures();
  }

  cooldown() {
    return this.votecd.getCooldownTime();
  }

  isLoggedIn() {
    return this.auth.currentUserValue != null;
  }

  loadRandomPictures(): void {
    // remove expire cooldown
    this.isLoading = true;
    this.votecd.removeExpiredCooldowns();
    let cooldownItems = [...this.votecd.getAllCooldowns().keys()];

    // fetching
    this.fmapi.randomPictures(cooldownItems).subscribe(
      (data: Picture[]) => {
        this.pictures = data;
        this.isLoading = false;
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

  getPlayer(id: number) {
    return this.pictures[id]?.name.length > 20
      ? this.pictures[id]?.name.slice(0, 21) + '....'
      : this.pictures[id]?.name ?? '';
  }

  getSortPlayer() {
    return this.pictures.sort((a, b) => b.rating_score - a.rating_score);
  }

  public getRules() {
    const actualScorePlayerA = 1;
    const kFactor = 32;

    const [newAWin, newBLose, calAwin] = this.elorating.updateRatings(
      this.pictures[0].rating_score,
      this.pictures[1].rating_score,
      actualScorePlayerA,
      kFactor
    );

    const [newBWin, newALose, calBwin] = this.elorating.updateRatings(
      this.pictures[1].rating_score,
      this.pictures[0].rating_score,
      actualScorePlayerA,
      kFactor
    );

    Swal.fire({
      title: 'Vote System !',
      html: `
      <div class="flex flex-col text-sm lg:text-md indent-6">
          <div class="pb-6 text-left"> This voting system uses the elorating voting equation.</div>
          <div class="pb-2 ">Rn=Ro+K×(S−E)</div>
          <div>KFactor 32</div>
          <p class="text-left pb-2">    
          If your vote for  <span class="text-blue-300">${this.pictures[0].name}</span> has a score of  ${this.pictures[0].rating_score} , the reward score will be 
             <span class="text-green-300">${newAWin}</span>  and ${this.pictures[1].name} will be <span class="text-red-300">${newBLose}</span>
          </p>
          <p class="py-2">${calAwin}</p>
          <p class="text-left">If your vote for <span class="text-blue-300">${this.pictures[1].name}</span> has a score of  ${this.pictures[1].rating_score}, the reward score will be 
          <span class="text-green-300">${newBWin} </span> and ${this.pictures[0].name} will be <span class="text-red-300">${newALose}</span></p>
          <p class="py-2">${calBwin}</p>
      </div>
    `,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then(() => {});
  }

  handleVote(id: any) {
    if (this.isLoggedIn()) {
      this.vote(id);
    } else {
      this.voteGuest(id);
    }
  }

  public voteGuest(id: any) {
    let opponentId: any = this.pictures.filter((item) => item.pid != id)[0].pid;
    this.votecd.removeExpiredCooldowns();
    if (this.votecd.findCooldown(id)) {
      let time = this.votecd.getRemainingCooldown(id);
      return Toastify({
        text: 'This picture can be voted on ' + time + 's',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right,  #C93D3D , #FFF700)',
        },
        onClick: function () {},
      }).showToast();
    }

    this.fmapi.voteGuest(id ,opponentId).subscribe((data) => {
      if (data.affectedRows === 1) {
        Toastify({
          text: `Guest Vote for ${data.win[0].name}!`,
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

  public vote(id: any) {
    let opponentId: any = this.pictures.filter((item) => item.pid != id)[0].pid;
    if (this.auth.currentUserValue != null) {
      this.votecd.removeExpiredCooldowns();
      if (this.votecd.findCooldown(id)) {
        let time = this.votecd.getRemainingCooldown(id);
        return Toastify({
          text: 'This picture can be voted on ' + time + 's',
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right,  #C93D3D , #FFF700)',
          },
          onClick: function () {},
        }).showToast();
      }

      let uid: any = this.auth.currentUserValue.uid;
      this.fmapi.vote(uid, id, opponentId).subscribe((data) => {
        if (data.affectedRows === 1) {
          Toastify({
            text: `${this.auth.currentUserValue?.full_name } Vote for ${data.win[0].name}!`,
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
