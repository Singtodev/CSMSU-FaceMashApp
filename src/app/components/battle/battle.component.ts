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
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.loadRandomPictures();
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
    Swal.fire({
      title: 'Vote System !',
      html: `
      <div class="flex flex-col text-sm lg:text-md indent-6">
          <div class="pb-6 text-left"> There's a cooldown period on repeating image votes. If the image you selected has a higher score than the other image, it will receive fewer points. Conversely, if the image with fewer votes is voted on, it will receive more points..</div>
          <p class="text-left pb-2">If your vote for  <span class="text-blue-300">${
            this.getSortPlayer()[0].name
          }</span> has a score of  ${
        this.getSortPlayer()[0].rating_score
      } , the reward score will be randomly between 1 and 5 </p>
          <p class="text-left">If your vote for <span class="text-blue-300">${
            this.getSortPlayer()[1].name
          }</span> has a score of  ${
        this.getSortPlayer()[1].rating_score
      }, the reward score will be randomly between 5 and 20.</p>
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
            text: `Vote for ${data.win[0].name} + ${data.score}  !`,
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
