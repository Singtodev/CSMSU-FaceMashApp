import { Component } from '@angular/core';
import { FacemashApiService } from '../../services/api/facemash-api.service';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import { VoteCooldownService } from '../../services/vote-cooldown.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting-admin-app',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './setting-admin-app.component.html',
  styleUrl: './setting-admin-app.component.scss'
})
export class SettingAdminAppComponent {
  constructor(
    private fmapi: FacemashApiService,
    private auth: AuthService,
    private router: Router,
    private votecd: VoteCooldownService
  ) {}
  
  public cd = 0;

  ngOnInit() {
    if (this.auth.currentUserValue === null) {
      this.router.navigate(['/login']);
    }
    if (this.auth?.currentUserValue?.role != null && this.auth?.currentUserValue?.role != 1) {
      this.router.navigate(['/setting']);
    }
  }

  cooldown(){
    return this.votecd.getCooldownTime();
  }

  changeCooldown(){
    this.fmapi.updateVoteDelay(this.cd).subscribe((data)=> {
      Swal.fire({
        title: 'Update Success!',
        text: 'System need to reload page',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#000',
      }).then(() => {
        try {
          this.fmapi.getVoteDelay().subscribe((data) => {
            let cd = data[0];
            this.votecd.setCooldownTime(cd.app_vote_delay);
          });
        } catch (err) {}
      });
    });
  }

}
