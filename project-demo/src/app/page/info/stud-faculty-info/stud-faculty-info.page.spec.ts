import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudFacultyInfoPage } from './stud-faculty-info.page';

describe('StudFacultyInfoPage', () => {
  let component: StudFacultyInfoPage;
  let fixture: ComponentFixture<StudFacultyInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudFacultyInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudFacultyInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
