import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultyAccountPage } from './faculty-account.page';

describe('FacultyAccountPage', () => {
  let component: FacultyAccountPage;
  let fixture: ComponentFixture<FacultyAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
