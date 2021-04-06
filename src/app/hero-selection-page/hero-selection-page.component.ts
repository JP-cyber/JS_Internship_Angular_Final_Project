import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MyValidators } from '../my.validators';
import { HeroApiResponse } from '../shared/interfaces';
import { HeroService } from '../shared/services/hero.service';
import { RecentSearchesService } from '../shared/services/recent-searches.service';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss']
})
export class HeroSelectionPageComponent implements OnInit {

  heroResponse: HeroApiResponse;

  form: FormGroup;

  faSearch = faSearch;

  constructor(
    public heroService: HeroService,
    public searhces: RecentSearchesService
    ) { }

  ngOnInit(): void {
    this.searhces.updateSearches();
    this.form = new FormGroup({
      searchInput: new FormControl(null, MyValidators.heroValidation)
    });
  }

  searchHeroes(): void {
    const hero =  this.form.get('searchInput').value;
    
    this.heroService.getHeroes(hero).subscribe((response) => {
      if(response.response == 'success'){
        this.heroResponse = response;
        this.searhces.addSearch(hero);
      }
    });
    
  }

  repeatSearch(text: string): void {
    this.heroService.getHeroes(text).subscribe((response) => {
      this.heroResponse = response;
      this.form.get('searchInput').setValue(text);
    });
  }

}
