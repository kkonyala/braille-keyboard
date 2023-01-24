import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyMapService {

  constructor() { }

  public getKeyMap() {
    return [
      {key: [1], value: 'A'},
      {key: [1, 2], value: 'B'},
      {key: [1, 4], value: 'C'},
      {key: [1, 4, 5], value: 'D'},
      {key: [1, 5], value: 'E'},
      {key: [1, 2, 4], value: 'F'},
      {key: [1, 2, 4, 5], value: 'G'},
      {key: [1, 2, 5], value: 'H'},
      {key: [2, 4], value: 'I'},
      {key: [2, 4, 5], value: 'J'},
      {key: [1, 3], value: 'K'},
      {key: [1, 2, 3], value: 'L'},
      {key: [1, 3, 4], value: 'M'},
      {key: [1, 3, 4, 5], value: 'N'},
      {key: [1, 3, 5], value: 'O'},
      {key: [1, 2, 3, 4], value: 'P'},
      {key: [1, 2, 3, 4, 5], value: 'Q'},
      {key: [1, 2, 3, 5], value: 'R'},
      {key: [2, 3, 4], value: 'S'},
      {key: [2, 3, 4, 5], value: 'T'},
      {key: [1, 3, 6], value: 'U'},
      {key: [1, 2, 3, 6], value: 'V'},
      {key: [2, 4, 5, 6], value: 'W'},
      {key: [1, 3, 4, 6], value: 'X'},
      {key: [1, 3, 4, 5, 6], value: 'Y'},
      {key: [1, 3, 5, 6], value: 'Z'}
    ];
  }
}
