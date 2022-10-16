import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmSendDataComponent} from "../modal-confirm-send-data/modal-confirm-send-data.component";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() sentence: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['sentence'].currentValue){
      this.sentence = changes['sentence'].currentValue;
    }
    console.log('changes', changes);
  }

  onClickSend() {
    this.modalService.open(ModalConfirmSendDataComponent, {centered: true});
  }
}
