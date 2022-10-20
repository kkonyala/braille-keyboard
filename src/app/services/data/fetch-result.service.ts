import {Injectable} from '@angular/core';
import {KeyMapService} from "./key-map.service";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class FetchResultService {

  constructor(private keyMapService: KeyMapService) {
  }

  getTouchIdList(touches: any) {
    const touchIdList = [];

    for (const touch of touches) {
      if (touch.target.id) {
        window.navigator.vibrate(100);
        touchIdList.push(parseInt(touch.target.id[1]));
      }
    }
    console.log('getTouchIdList');
    console.log('getTouchIdList', touchIdList);
    console.log('getTouchIdList sorted', touchIdList.sort());
    return touchIdList.sort();
  }

  detectLetter(touches: any) {
    const touchIdList = this.getTouchIdList(touches);
    const mapValue = this.keyMapService.getKeyMap();

    let result = '';
    mapValue.forEach(map => {
      if (_.isEqual(map.key, touchIdList)) {
        result = map.value;
      }
    })
    console.log('detectLetter');
    console.log('detectLetter', result);
    return result;
  }

  fetchTouchCoordinates(touches: any[]) {
    const result: any[] = [];

    for (let i = 0; i < touches.length; i++) {
      const {clientX: x, clientY: y} = touches[i];
      result.push({x, y})
    }
    console.log('fetchTouchCoordinates');
    console.log('fetchTouchCoordinates', result);
    return result;
  }

  fetchSwipeTouchCoordinates(touches: any[]) {
    const result: any[] = [];
    for (let i = 0; i < touches.length; i++) {
      const {x, y} = touches[i].value;
      result.push({x, y})
    }
    console.log('fetchSwipeTouchCoordinates');
    console.log('fetchSwipeTouchCoordinates', result);
    return result;
  }
}
