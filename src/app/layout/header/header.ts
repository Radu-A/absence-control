import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth-service';
import { Observable } from 'rxjs';
import { Session } from '../../core/models/session.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIcon, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  router = inject(Router);
  authService = inject(AuthService);

  currentUser$: Observable<Session | null> = this.authService.currentUser$;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
