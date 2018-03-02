import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  selectedHero: Hero = null;
  subscribe: Subscription;

  constructor(public heroService: HeroService) { }

  ngOnInit() {
    this.subscribe = this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  handleSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
