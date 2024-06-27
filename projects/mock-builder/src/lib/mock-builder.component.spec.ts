import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockBuilderComponent } from './mock-builder.component';

describe('MockBuilderComponent', () => {
  let component: MockBuilderComponent;
  let fixture: ComponentFixture<MockBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
