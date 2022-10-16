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
    return result;
  }

  fetchTouchCoordinates(touches: any[]) {
    const result: any[] = [];

    for (let i = 0; i < touches.length; i++) {
      const {clientX: x, clientY: y} = touches[i];
      result.push({x, y})
    }
    return result;
  }

  fetchSwipeTouchCoordinates(touches: any[]) {
    const result: any[] = [];
    for (let i = 0; i < touches.length; i++) {
      const {x, y} = touches[i].value;
      result.push({x, y})
    }
    return result;
  }
}
