import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet-select',
  templateUrl: './alphabet-select.component.html',
  styleUrls: ['./alphabet-select.component.scss']
})
export class AlphabetSelectComponent {

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

  alphabet = [
    "a", "b", "c", "d", "e","f",
     "g", "h", "i", "j", "k", "l",
      "m", "n", "o", "p", "q", "r",
       "s", "t", "u", "v", "w", "x",
        "y", "z"
      ];
  
  showAlphabet = false;

  constructor() {}

  search(e) {
    const letter = e.target.textContent;
    this.onSearch.emit(letter);
    this.showAlphabet = false;
  }

}
