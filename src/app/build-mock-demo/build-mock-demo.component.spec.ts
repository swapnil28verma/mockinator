import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildMockDemoComponent } from './build-mock-demo.component';

describe('BuildMockDemoComponent', () => {
  let component: BuildMockDemoComponent;
  let fixture: ComponentFixture<BuildMockDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildMockDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildMockDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
