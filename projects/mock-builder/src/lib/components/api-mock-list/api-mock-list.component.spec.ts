import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockListComponent } from './api-mock-list.component';

describe('ApiMockListComponent', () => {
  let component: ApiMockListComponent;
  let fixture: ComponentFixture<ApiMockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMockListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiMockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
