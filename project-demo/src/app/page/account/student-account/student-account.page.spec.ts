import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentAccountPage } from './student-account.page';

describe('StudentAccountPage', () => {
  let component: StudentAccountPage;
  let fixture: ComponentFixture<StudentAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
