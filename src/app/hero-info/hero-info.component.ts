import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SingleHeroResponse } from '../shared/interfaces';
import { HeroService } from '../shared/services/hero.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {

  hero: SingleHeroResponse;

  constructor(
    private route: ActivatedRoute,
    public heroService: HeroService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((response: Params) => {
      if(response.id){
          this.heroService.getHeroById(response.id).subscribe(hero => {
            this.hero = hero;
        });
      }
    });
  }

}
