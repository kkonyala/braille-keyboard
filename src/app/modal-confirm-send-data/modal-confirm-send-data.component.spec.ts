import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmSendDataComponent } from './modal-confirm-send-data.component';

describe('ModalConfirmSendDataComponent', () => {
  let component: ModalConfirmSendDataComponent;
  let fixture: ComponentFixture<ModalConfirmSendDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmSendDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmSendDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
