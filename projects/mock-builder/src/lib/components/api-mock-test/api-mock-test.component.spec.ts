import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockTestComponent } from './api-mock-test.component';

describe('ApiMockTestComponent', () => {
  let component: ApiMockTestComponent;
  let fixture: ComponentFixture<ApiMockTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMockTestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiMockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
