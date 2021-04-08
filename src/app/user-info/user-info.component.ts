import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Battle, SingleHeroResponse } from '../shared/interfaces';
import { BattleService } from '../shared/services/battle.service';
import { HeroService } from '../shared/services/hero.service';
import { SortService } from '../shared/services/sort.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('addIcon') addIcon: ElementRef;
  display = '';
  selectedHeroes: Array<SingleHeroResponse> = [];
  battleItems: Battle[] = this.battles.getBattles();
  addHeroIcon = faPlusCircle;
  sorted: boolean = false;

  constructor(
    public battles: BattleService,
    public heroService: HeroService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.display = 'history';
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

  sortByHeader(param: string) {
    this.sortService.sort(this.battleItems, this.sorted, param);
  }

}
