import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../core/services/auth-service';
import { NotificationService } from '../../core/services/notification-service';

import { Login } from './login';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const mockAuthService = {
    login: vi.fn().mockReturnValue(of(true)),
  };

  const mockNotificationService = {
    showError: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call "onsubmit" method when clicking "login" button', () => {
    const spy = vi.spyOn(component, 'onSubmit');

    component.loginForm.setValue({
      email: 'manager@auria.com',
      password: 'manager123',
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');

    button.click();

    expect(spy).toBeCalled();
  });
});
