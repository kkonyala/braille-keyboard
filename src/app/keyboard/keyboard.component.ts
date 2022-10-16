import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FetchResultService} from "../services/data/fetch-result.service";
import {SwipeDetectorService} from "../services/swipe/swipe-detector.service";

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

  constructor(private fetchResultService: FetchResultService, private swipeDetectorService: SwipeDetectorService) {
    this.touches = [];
    this.swipeTouches = [];
    this.result = [];
    this.sentence = '';
  }

  ngOnInit(): void {
  }

  onTouchStart($event: TouchEvent) {
    $event.preventDefault();
    this.touches = $event.touches;
  }

  onSwipe($event: TouchEvent) {
    $event.preventDefault();
    const {touches, timeStamp} = $event;
    const value = {x: touches[0].clientX, y: touches[0].clientY};
    this.swipeTouches.push({value, timeStamp});
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
    this.result.push({touches, value, touchType});
  }

  unsetTouches() {
    this.touches = [];
    this.swipeTouches = [];
  }
}
