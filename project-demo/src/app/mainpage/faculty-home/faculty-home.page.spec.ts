import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultyHomePage } from './faculty-home.page';

describe('FacultyHomePage', () => {
  let component: FacultyHomePage;
  let fixture: ComponentFixture<FacultyHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
