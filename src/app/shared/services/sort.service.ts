import { Injectable } from "@angular/core";
import { Battle } from "../interfaces";

@Injectable({providedIn: 'root'})
export class SortService {

    sort(battles: Battle[], sorted: boolean, by: string): void {
        if(sorted){
            battles.sort((a, b) => {
              if(a[by] < b[by]){
                return 1;
              }else if(a[by] > b[by]){
                return -1;
              }
            });
        }else{
            battles.sort((a, b) => {
                if(a[by] > b[by]){
                  return 1;
                }else if(a[by] < b[by]){
                  return -1;
                }
              });
        }
        
    }
}