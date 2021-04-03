import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('searchInput') searchInput: ElementRef;

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

  searchHeroes(heroName = null) {
    const hero = heroName || this.searchInput.nativeElement.value;
    this.searchInput.nativeElement.value = hero;
    
    this.heroService.getHeroes(hero).subscribe((response) => {
      if(response.response == 'success'){
        this.heroResponse = response;

        if(!heroName){
          this.searhces.addSearch(hero);
        }
      }
    });
    
  }

  repeatSearch(e){
    const hero = e.target.textContent;
    this.heroService.getHeroes(hero).subscribe((response) => {
      this.heroResponse = response;
    });
  }

}
