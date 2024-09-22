import { makeAutoObservable } from 'mobx';

class MainStore {
	heroes = [];
	choosedHeroes = [];

	constructor() {
		makeAutoObservable(this);
	}

	setHeroes(heroes) {
		this.heroes = heroes;
		console.log(this.heroes);
	}

	findHeroById(id) {
		return this.choosedHeroes.findIndex(hero => hero.id === id);
	}

	addChoosedHero(hero) {
		const index = this.findHeroById(hero.id);
		if (index !== -1) {
			// Hero is already in the list, remove it
			this.choosedHeroes.splice(index, 1);
		} else {
			// Hero is not in the list, add it
			this.choosedHeroes.push(hero);
		}
	}
}

export const Store = new MainStore();
