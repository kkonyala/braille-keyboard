import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { FetchResultService } from "../services/data/fetch-result.service";
import { SwipeDetectorService } from "../services/swipe/swipe-detector.service";
import { FirestoreServiceService } from '../services/firestore/firestore-service.service';
import { formatDate } from '@angular/common';

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

  // Get the initial screen size
  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  // Update the screen size on screen resize event
  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  onTouchStart($event: TouchEvent) {
    $event.preventDefault();
    this.touches = $event.touches;

    let [sessionId, dateTime, DTinMilliseconds] = this.getSessionAndDT();
    const singleResult = {
      dateTime: dateTime,
      DTinMilliseconds: DTinMilliseconds,
      sessionId: sessionId,
      eventType: 'touchstart',
      screenHeight: this.windowHeight,
      screenWidth: this.windowWidth,
      touches: this.fetchResultService.fetchTouchCoordinates(this.touches)
    };

    this.result.push(singleResult);

    // Capture the record on touchstart events in the firestore database
    this.firestoreService.insertRecord(singleResult);

    for (const touch of this.touches) {
      if (touch.target.id) {
        //var img="assets/keyboard/icons-button/"+"p"+parseInt(touch.target.id[1])+ ".png";
        var img="assets/keyboard/icons-button/p"+ parseInt(touch.target.id[1]) +".png";
        document.getElementById("i"+parseInt(touch.target.id[1]))!.setAttribute( 'src', img);
      }
    }
    let m = document.getElementById('showInput');
    m!.textContent='';
    m!.style.display = 'none';
    m!.classList.remove("animatee");
  }

  onSwipe($event: TouchEvent) {
    $event.preventDefault();
    const { touches, timeStamp } = $event;
    const value = { x: touches[0].clientX, y: touches[0].clientY };
    this.swipeTouches.push({ value, timeStamp });

    // Uncomment the below code to enable capturing events on swipe

    // let [sessionId, dateTime, DTinMilliseconds] = this.getSessionAndDT();
    // const singleResult = {
    //   dateTime: dateTime,
    //   DTinMilliseconds: DTinMilliseconds,
    //   sessionId: sessionId,
    //   eventType: 'touchmove',
    //   swipeTouches: this.fetchResultService.fetchSwipeTouchCoordinates(this.swipeTouches)
    // };

    // this.result.push(singleResult);

    // Capture the record on swipe events in the firestore database
    // this.firestoreService.insertRecord(singleResult);
  }

  onTouchEnd() {
    const letter = this.fetchResultService.detectLetter(this.touches);
    let m = document.getElementById('showInput');
    m!.textContent=letter;
    m!.style.transform = 'rotate(90deg)';
    m!.style.display = 'block';
    setTimeout(function() {
      m!.classList.add("animatee");
    }, 300);

    for (const touch of this.touches) {
      if (touch.target.id) {
        var img="assets/keyboard/icons-button/"+parseInt(touch.target.id[1])+ ".png";
        document.getElementById("i"+parseInt(touch.target.id[1]))!.setAttribute( 'src', img);
      }
    }
    
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

    let [sessionId, dateTime, DTinMilliseconds] = this.getSessionAndDT();
    const singleResult = {
      dateTime: dateTime,
      DTinMilliseconds: DTinMilliseconds,
      sessionId: sessionId,
      eventType: 'touchend'
    };

    this.result.push(singleResult);

    // Capture the record on touchend events in the firestore database
    this.firestoreService.insertRecord(singleResult);
 
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

  private getSessionAndDT() {
    var session_data = sessionStorage.getItem('sessionId');

    // Get the sessionId from browser's session storage
    // If the value is present, then use that value
    // Else (for the initial page visit), generate a UUID and assign it to sessionId
    if (session_data === null) {
      console.log('no session value found');
      var sessionId_val = crypto.randomUUID();
      sessionStorage.setItem('sessionId', sessionId_val);
      console.log('session value set to', sessionId_val);
    } else {
      console.log('found session value', session_data);
    }

    var currentDT = new Date();

    var sessionId = sessionStorage.getItem('sessionId');

    // Convert datetime format
    // var dateTime = currentDT.toLocaleString('en-US', { timeZone: 'America/New_York', timeZoneName: 'shortGeneric' });
    var dateTime = formatDate(currentDT, 'yyyy-MM-dd HH:mm:ss', 'en-US', 'EST')
    var DTinMilliseconds = currentDT.getTime();

    return [sessionId, dateTime, DTinMilliseconds];

  }

  private setResult(touches: any, value: any, touchType: any) {

    let [sessionId, dateTime, DTinMilliseconds] = this.getSessionAndDT();

    const singleResult = {
      touches,
      value,
      touchType,
      screenHeight: this.windowHeight,
      screenWidth: this.windowWidth,
      dateTime: dateTime,
      DTinMilliseconds: DTinMilliseconds,
      sessionId: sessionId,
      eventType: 'setResult',
      previousSentence: this.sentence
    };

    this.result.push(singleResult);

    // Capture the result in the firestore database
    this.firestoreService.insertRecord(singleResult);
    console.log('Data sent to Firebase', singleResult);

  }

  unsetTouches() {
    this.touches = [];
    this.swipeTouches = [];
  }
}
