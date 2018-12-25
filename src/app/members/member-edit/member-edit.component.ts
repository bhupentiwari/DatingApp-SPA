import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if (this.editForm.dirty) {
        $event.returnValue = false;
      }
    }
  constructor(private authService: AuthService,
              private rout: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService
              ) { }

  ngOnInit() {
    this.rout.data.subscribe(d => {
      this.user = d['user'];
    });

    this.authService.currentPhotoUrl.subscribe(p => this.photoUrl = p);
  }
  updateChanges() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe( next =>{
      this.alertify.success('Profile updated successfull');
      this.editForm.reset(this.user);
    });
  }

  updateMainPhoto(photoURL: string) {
    this.user.photoUrl = photoURL;
  }
}
