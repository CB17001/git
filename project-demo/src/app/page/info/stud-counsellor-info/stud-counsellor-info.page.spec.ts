import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudCounsellorInfoPage } from './stud-counsellor-info.page';

describe('StudCounsellorInfoPage', () => {
  let component: StudCounsellorInfoPage;
  let fixture: ComponentFixture<StudCounsellorInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudCounsellorInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudCounsellorInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
