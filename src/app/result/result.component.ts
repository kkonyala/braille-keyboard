import { Component, Input, OnChanges, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FirestoreServiceService } from '../services/firestore/firestore-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() sentence: any;
  public windowHeight: any;
  public windowWidth: any;

  constructor(private modalService: NgbModal, private firestoreService: FirestoreServiceService) {
  }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sentence'].currentValue) {
      this.sentence = changes['sentence'].currentValue;
    }
    console.log('changes', changes);
  }

  onClickSend() {
    this.firestoreService.insertRecord({
      screenHeight: this.windowHeight,
      screenWidth: this.windowWidth
    });
    console.log('Data sent');
  }
}
