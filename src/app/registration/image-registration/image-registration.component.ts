import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Share/Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-registration',
  templateUrl: './image-registration.component.html',
  styleUrls: ['./image-registration.component.css']
})
export class ImageRegistrationComponent implements OnInit {
  imageURL = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';
  isPreviewing = false;
  file: any;
  constructor(private userServ: UserService,
              private router: Router) { }

  ngOnInit() {
  }
  previewImage(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);
      reader.onload =  (e) => {
        this.imageURL =  e.target['result'];
        this.file = fileInput;
        this.isPreviewing = true;
      };
    }
  }
  uploadImage() {
    this.userServ.uploadUserImage(this.file).then(
      () => {
        this.router.navigate(['/registration/instruction']);
      }
    ).catch((error) => console.log(error));
  }
  cancelImage() {
    this.imageURL = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';
    this.isPreviewing = false;
    this.file = null;
  }
}
