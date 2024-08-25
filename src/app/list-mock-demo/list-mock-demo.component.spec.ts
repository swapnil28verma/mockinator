import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMockDemoComponent } from './list-mock-demo.component';

describe('ListMockDemoComponent', () => {
  let component: ListMockDemoComponent;
  let fixture: ComponentFixture<ListMockDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMockDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMockDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
