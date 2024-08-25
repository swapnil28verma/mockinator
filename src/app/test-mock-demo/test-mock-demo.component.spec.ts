import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestMockDemoComponent } from './test-mock-demo.component';

describe('TestMockDemoComponent', () => {
  let component: TestMockDemoComponent;
  let fixture: ComponentFixture<TestMockDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMockDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestMockDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
