import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';

// Group all tests of this component
describe('NotFound Component', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
  });

  it('it should be created propertly', () => {
    expect(component).toBeTruthy();
  });
});
