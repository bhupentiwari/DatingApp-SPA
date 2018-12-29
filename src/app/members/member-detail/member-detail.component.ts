import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AuthService } from '../../_service/auth.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private authService: AuthService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.user = d['user'];
    });
    this.route.queryParams.subscribe(p => {
      const selectedTab = p['tab'];
      this.staticTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 20,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
      const imageURLs = [];
      for (let index = 0; index < this.user.photos.length; index++) {

        imageURLs.push({
          small: this.user.photos[index].url,
          medium: this.user.photos[index].url,
          big: this.user.photos[index].url,
          description: this.user.photos[index].url,
        });
      }
      return imageURLs;
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
        .subscribe(data => {
          this.alertify.success('You have liked: ' + this.user.knownAs);
        }, error => {
          this.alertify.error(error);
        });
  }
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
  // Commented as we are using now route resolver
  // loadUser() {
  //    this.userService.getUser(+this.route.snapshot.params['id']).subscribe( (u: User) => {
  //       this.user = u;
  //    }, error => {
  //      this.alertify.error(error);
  //    });
  // }

}
