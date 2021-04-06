import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecentSearchesService } from '../shared/services/recent-searches.service';

@Component({
  selector: 'app-repeat-search',
  templateUrl: './repeat-search.component.html',
  styleUrls: ['./repeat-search.component.scss']
})
export class RepeatSearchComponent implements OnInit {

  @Output() onRepeatSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(public searches: RecentSearchesService) { }

  ngOnInit(): void {
  }

  repeatSearch(textContent: string): void {
    this.onRepeatSearch.emit(textContent);
  }

}
