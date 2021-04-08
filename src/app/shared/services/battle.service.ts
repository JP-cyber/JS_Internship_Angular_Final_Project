import { Injectable } from "@angular/core";
import { Battle, Powerup, SingleHeroResponse } from "../interfaces";

@Injectable({providedIn: 'root'})
export class BattleService {

    private battles: Battle[] = [];
    private powerups: Powerup[] = [
        {
            name: "Captain's America Shield",
            bonus: 'Durability',
            imageUrl: 'https://png.pngitem.com/pimgs/s/6-61962_captain-america-shield-png-transparent-png.png',
            left: 5

        },
        {
            name: "Mjolnir",
            bonus: 'Power',
            imageUrl: 'https://www.seekpng.com/png/small/57-573278_thor-hammer-png-image-transparent-download-mjolnir-icon.png',
            left: 5

        },
        {
            name: "Iron Man's Nano Armor",
            bonus: 'Combat',
            imageUrl: 'https://simg.nicepng.com/png/small/78-782326_ironman1icon-reactor-arc-iron-man.png',
            left: 5

        },
        {
            name: "Dr.Strange's Cloak",
            bonus: 'Intelligence',
            imageUrl: 'https://p.jing.fm/clipimg/small/175-1752857_doctor-strange-costume-png-doctor-strange-editing-background.png',
            left: 5

        },
        {
            name: "Green Lantern's Ring",
            bonus: 'Strength',
            imageUrl: 'https://i.pinimg.com/originals/2f/e2/8c/2fe28ce820eed86d6d8a42fae92a17b1.png',
            left: 5

        },
        {
            name: "Flash Boots",
            bonus: 'Speed',
            imageUrl: 'https://i.imgur.com/VTp6Kal.png',
            left: 5

        }
    ];

    constructor() {
        const localBattles = localStorage.getItem('battles');

        if(localBattles){
            this.battles = JSON.parse(localBattles);
        }else{
            const battleArr = this.battles;
            localStorage.setItem('battles', JSON.stringify(battleArr));
        }

        this.updatePowerups();
    }

    battleHeroes(hero: SingleHeroResponse, opponent: SingleHeroResponse): void {
        const heroPowerPoins = Object.values(hero.powerstats).reduce((a, b) => {
            const result = +a + +b;
            return result.toString();
        });
        const opponentPowerPoins = Object.values(opponent.powerstats).reduce((a, b) => {
            const result = +a + +b;
            return result.toString();
        });

        const battleObj: Battle = {
            date: new Date(),
            heroName: hero.name,
            heroId: hero.id,
            opponentName: opponent.name,
            opponentId: opponent.id,
            battleResult: heroPowerPoins > opponentPowerPoins ? 'WON' : 'LOST' 
        };

        this.saveBattle(battleObj);
        this.fixPowerupChanges();
    }

    saveBattle(battle: Battle): void {
        this.battles = [...this.battles, battle];
        localStorage.setItem('battles', JSON.stringify(this.battles));
    }

    getBattles(): Battle[] {
        return this.battles;
    }

    getLastBattle(): Battle{
        const lastBattleIndex = this.battles.length - 1;
        return this.battles[lastBattleIndex];
    }

    togglePowerup(powerup: string, selected: boolean): void {
        this.powerups.forEach(p => {
            const isRelevant = powerup == p.bonus;
            if(isRelevant && selected){
                p.left = p.left + 1;
            }else if(isRelevant && !selected){
                p.left = p.left - 1;
            }
        });
    }

    fixPowerupChanges(): void {
        const powersObj = [];
        this.powerups.forEach(p => {
            powersObj.push({
                bonus: p.bonus,
                left: p.left
            });
        });
        localStorage.setItem('powerups', JSON.stringify(powersObj));
    }

    updatePowerups(): void {
        const localPowerups = localStorage.getItem('powerups');
        const parsedPowerups: Powerup[] = JSON.parse(localPowerups);
        if(parsedPowerups){
                parsedPowerups.forEach((p, idx) => {
                this.powerups[idx].left = p.left;
            });
        }
        
    }
    
    getPowerups(): any[] {
        return this.powerups;
    }

    clearBattleInfo(): void {
        localStorage.removeItem('battles');
        localStorage.removeItem('powerups');
        this.battles = [];
        this.powerups.forEach(p => {
            p.left = 5;
        });
    }
}