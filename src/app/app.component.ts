import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sentence: string;

  constructor() {
    this.sentence = '';
  }

  setOutputSentenceChangeEvent($event: any) {
    this.sentence = $event;
  }
}
