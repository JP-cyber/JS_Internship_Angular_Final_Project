import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { SingleHeroResponse } from '../shared/interfaces';
import { HeroService } from '../shared/services/hero.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('addIcon') addIcon: ElementRef;
  display = '';
  selectedHeroes: Array<SingleHeroResponse> = [];
  addHeroIcon = faPlusCircle;

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

  ngAfterViewInit(): void {
    if(this.heroService.isEmpty()){
      this.addIcon.nativeElement.classList.add('center');
    }
  }

}
