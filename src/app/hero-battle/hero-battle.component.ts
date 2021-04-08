import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faAtom, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Battle, SingleHeroResponse } from '../shared/interfaces';
import { BattleService } from '../shared/services/battle.service';
import { HeroService } from '../shared/services/hero.service';

@Component({
  selector: 'app-hero-battle',
  templateUrl: './hero-battle.component.html',
  styleUrls: ['./hero-battle.component.scss']
})
export class HeroBattleComponent implements OnInit {

  displayModal: boolean = false;
  userHero: SingleHeroResponse;
  opponentHero: SingleHeroResponse;
  faClose = faWindowClose;
  battleResult:Battle = this.battle.getLastBattle();
  @ViewChild('powerups') powerupsList: ElementRef;

  constructor(
    public heroService: HeroService,
    public battle: BattleService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    const heroes = this.heroService.getSelectedHeroes();
    const lastHeroIndex = heroes.length - 1;
    const lastHeroId = heroes[lastHeroIndex];
    
    this.heroService.getHeroById(lastHeroId).subscribe(hero => {
      this.userHero = hero;
    });
    this.heroService.getRandomHero().subscribe(hero => {
      this.opponentHero = hero;
    });
    this.battle.updatePowerups();
  }

  startBattle(userHero: SingleHeroResponse, opponentHero: SingleHeroResponse): void {
    this.battle.battleHeroes(userHero, opponentHero);
    this.battleResult = this.battle.getLastBattle();
    this.spinner.show("mySpinner", {
      type: "ball-clip-rotate-multiple",
      size: "large",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
    });
    const powerElems = this.powerupsList.nativeElement.children;
    for(let el of powerElems){
      el.classList.remove('selected');
    }
    setTimeout(() => {
      this.displayModal = true;
      this.spinner.hide('mySpinner');
    }, 5000);
  }

  togglePowerup(powerup: string, target: Element): void {
    const userHeroPower = this.userHero.powerstats[powerup.toLowerCase()];
    const isPowerSelected = target.classList.contains('selected');

    if(!isPowerSelected){
        const raisedHeroPower = +userHeroPower + 10;
        this.userHero.powerstats[powerup.toLowerCase()] = raisedHeroPower.toString();
    }else{
        const resetedHeroPower = +userHeroPower - 10;
        this.userHero.powerstats[powerup.toLowerCase()] = resetedHeroPower.toString();
    }

    this.battle.togglePowerup(powerup, isPowerSelected);
    target.classList.toggle('selected');
  }

}
