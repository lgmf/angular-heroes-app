import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs/Subscription';
import { remove as _remove } from 'lodash';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  heroes$: Observable<Hero[]>;
  subscribe: Subscription;

  constructor(public heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.subscribe = this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    _remove(this.heroes, hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
