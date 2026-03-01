import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private authService = inject(AuthService);

  public init() {
    this.authService.checkInitialState();
  }
}
