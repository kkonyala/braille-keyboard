import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyMapService {

  constructor() { }

  public getKeyMap() {
    return [
      {key: [4], value: 'A'},
      {key: [4, 5], value: 'B'},
      {key: [1, 4], value: 'C'},
      {key: [1, 2, 4], value: 'D'},
      {key: [2, 4], value: 'E'},
      {key: [1, 4, 5], value: 'F'},
      {key: [1, 2, 4, 5], value: 'G'},
      {key: [2, 4, 5], value: 'H'},
      {key: [1, 5], value: 'I'},
      {key: [1, 2, 5], value: 'J'},
      {key: [4, 6], value: 'K'},
      {key: [4, 5, 6], value: 'L'},
      {key: [1, 4, 6], value: 'M'},
      {key: [1, 2, 4, 6], value: 'N'},
      {key: [2, 4, 6], value: 'O'},
      {key: [1, 4, 5, 6], value: 'P'},
      {key: [1, 2, 4, 5, 6], value: 'Q'},
      {key: [2, 4, 5, 6], value: 'R'},
      {key: [1, 5, 6], value: 'S'},
      {key: [1, 2, 5, 6], value: 'T'},
      {key: [3, 4, 6], value: 'U'},
      {key: [3, 4, 5, 6], value: 'V'},
      {key: [1, 2, 3, 5], value: 'W'},
      {key: [1, 3, 4, 6], value: 'X'},
      {key: [1, 2, 3, 4, 6], value: 'Y'},
      {key: [2, 3, 4, 6], value: 'Z'}
    ];
  }
}
