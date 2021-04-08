import { Component } from '@angular/core';
import { HeroService } from '../shared/services/hero.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(public heroService: HeroService) { }

}
