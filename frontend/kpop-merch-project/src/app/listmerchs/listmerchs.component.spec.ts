import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmerchsComponent } from './listmerchs.component';

describe('ListmerchsComponent', () => {
  let component: ListmerchsComponent;
  let fixture: ComponentFixture<ListmerchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmerchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmerchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
