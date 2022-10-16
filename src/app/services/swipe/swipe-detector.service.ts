import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeDetectorService {
  validTime: number;
  thresholdAngleValue: number;


  constructor() {
    this.validTime = 100;
    this.thresholdAngleValue = 100;
  }

  detectSwipeDown(swipeTouches: any) {
    if (swipeTouches.length < 2) {
      return false;
    }

    const startTouch = swipeTouches[0];
    const endTouch = swipeTouches[swipeTouches.length - 1];

    const isSwipeDoneInValidTime = endTouch.timeStamp - startTouch.timeStamp <= this.validTime;
    const isSwipeDoneInLowerDirection = endTouch.value.y > startTouch.value.y;
    const isSwipeDoneBetweenThresholdAngle = Math.abs(endTouch.value.x - startTouch.value.x) <= this.thresholdAngleValue;

    return isSwipeDoneInValidTime && isSwipeDoneInLowerDirection && isSwipeDoneBetweenThresholdAngle;
  }

  detectSwipeUp(swipeTouches: any) {
    if (swipeTouches.length < 2) {
      return false;
    }

    const startTouch = swipeTouches[0];
    const endTouch = swipeTouches[swipeTouches.length - 1];

    const isSwipeDoneInValidTime = endTouch.timeStamp - startTouch.timeStamp <= this.validTime;
    const isSwipeDoneInUpperDirection = endTouch.value.y < startTouch.value.y;
    const isSwipeDoneBetweenThresholdAngle = Math.abs(endTouch.value.x - startTouch.value.x) <= this.thresholdAngleValue;

    return isSwipeDoneInValidTime && isSwipeDoneInUpperDirection && isSwipeDoneBetweenThresholdAngle;
  }

}
