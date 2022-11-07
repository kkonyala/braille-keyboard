import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { FetchResultService } from "../services/data/fetch-result.service";
import { SwipeDetectorService } from "../services/swipe/swipe-detector.service";
import { FirestoreServiceService } from '../services/firestore/firestore-service.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() outputSentenceChangeEvent = new EventEmitter<any>();
  touches: any;
  swipeTouches: any;
  result: any;
  sentence: string;
  windowHeight: any;
  windowWidth: any;

  constructor(private fetchResultService: FetchResultService, private swipeDetectorService: SwipeDetectorService, private firestoreService: FirestoreServiceService) {
    this.touches = [];
    this.swipeTouches = [];
    this.result = [];
    this.sentence = '';
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

  onTouchStart($event: TouchEvent) {
    $event.preventDefault();
    this.touches = $event.touches;
  }

  onSwipe($event: TouchEvent) {
    $event.preventDefault();
    const { touches, timeStamp } = $event;
    const value = { x: touches[0].clientX, y: touches[0].clientY };
    this.swipeTouches.push({ value, timeStamp });
  }

  onTouchEnd() {
    const letter = this.fetchResultService.detectLetter(this.touches);

    if (letter) {
      this.addLetter(letter);
    }

    const isSwipedDown = this.swipeDetectorService.detectSwipeDown(this.swipeTouches);
    if (isSwipedDown) {
      this.addSpace();
    }

    const isSwipedUp = this.swipeDetectorService.detectSwipeUp(this.swipeTouches);
    if (isSwipedUp) {
      this.removeLetter();
    }

    this.unsetTouches();
    this.outputSentenceChangeEvent.emit(this.sentence);
    console.log('result:', this.result);
  }

  private addLetter(letter: string) {
    const touchCoordinates = this.fetchResultService.fetchTouchCoordinates(this.touches);
    const value = 'ADD ' + letter;
    this.setResult(touchCoordinates, value, 'static');

    this.sentence += letter;
  }

  private removeLetter() {
    const removedLetter = this.sentence[this.sentence.length - 1];
    const swipeTouchCoordinates = this.fetchResultService.fetchSwipeTouchCoordinates(this.swipeTouches);
    const value = 'DELETE ' + removedLetter;
    this.setResult(swipeTouchCoordinates, value, 'swipe');

    this.sentence = this.sentence.slice(0, -1);
  }

  private addSpace() {
    const swipeTouchCoordinates = this.fetchResultService.fetchSwipeTouchCoordinates(this.swipeTouches);
    const value = 'ADD SPACE';
    this.setResult(swipeTouchCoordinates, value, 'swipe');

    this.sentence += ' ';
  }

  private setResult(touches: any, value: any, touchType: any) {

    var session_data = sessionStorage.getItem('session_id');

    if (session_data === null) {
      console.log('no session value found');
      var session_id_val = crypto.randomUUID();
      sessionStorage.setItem('session_id', session_id_val);
      console.log('session value set to', session_id_val);
    } else {
      console.log('found session value', session_data);
    }

    var currentDT = new Date();

    const singleResult = {
      touches,
      value,
      touchType,
      screenHeight: this.windowHeight,
      screenWidth: this.windowWidth,
      dateTime: currentDT.toLocaleString('en-US', { timeZone: 'America/New_York', timeZoneName: 'shortGeneric' }),
      DTinMilliseconds: currentDT.getTime(),
      session_id: sessionStorage.getItem('session_id')
    };

    this.result.push(singleResult);
    this.firestoreService.insertRecord(singleResult);
    console.log('Data sent to Firebase');

  }

  unsetTouches() {
    this.touches = [];
    this.swipeTouches = [];
  }
}
