import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private defaultImage = 'assets/icon/usuario.webp';

  private profileImageSubject = new BehaviorSubject<string>(
    localStorage.getItem('user_profile_image') || this.defaultImage
  );

  profileImage$ = this.profileImageSubject.asObservable();

  updateImage(newBase64: string) {
    localStorage.setItem('user_profile_image', newBase64);
    this.profileImageSubject.next(newBase64);
  }
}
