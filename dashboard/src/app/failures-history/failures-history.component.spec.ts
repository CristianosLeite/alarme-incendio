import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailuresHistoryComponent } from './failures-history.component';

describe('FailuresHistoryComponent', () => {
  let component: FailuresHistoryComponent;
  let fixture: ComponentFixture<FailuresHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailuresHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailuresHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
