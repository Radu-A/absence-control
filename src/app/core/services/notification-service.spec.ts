import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('service should be instanciated correnctly', () => {
    expect(service).toBeTruthy();
  });

  it('service should call snackBar.open when showError is executed', () => {
    const spy = vi.spyOn(snackBar, 'open');
    const testMessage = 'Test error!';
    service.showError(testMessage);

    expect(spy).toBeCalled();
  });

  it('service should configure snackbar with "error-snackbar class"', () => {
    const spy = vi.spyOn(snackBar, 'open');
    const mensaje = 'Mensaje de error';

    service.showError(mensaje);

    expect(spy).toHaveBeenLastCalledWith(
      mensaje,
      'Close',
      expect.objectContaining({
        panelClass: ['error-snackbar'],
      }),
    );
  });
});
