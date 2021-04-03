import { Component, OnInit } from '@angular/core';
import { SingleHeroResponse } from '../shared/interfaces';
import { HeroService } from '../shared/services/hero.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  display = '';
  selectedHeroes: Array<SingleHeroResponse> = [];

  constructor(
    public heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.display = 'heroesList';
    const heroIds = this.heroService.getSelectedHeroes();
    heroIds.forEach(id => {
      this.heroService.getHeroById(id).subscribe(res => {
        this.selectedHeroes.push(res);
      });
    });
  }


}
