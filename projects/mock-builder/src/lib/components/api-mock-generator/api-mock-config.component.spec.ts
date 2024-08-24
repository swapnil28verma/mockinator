import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockConfigComponent } from './api-mock-config.component';

describe('ApiMockGeneratorComponent', () => {
  let component: ApiMockConfigComponent;
  let fixture: ComponentFixture<ApiMockConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMockConfigComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiMockConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
