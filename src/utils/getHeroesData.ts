import { Store } from "store";
import axios from 'axios';

async function fetchHeroes() {
	try {
		const response = await axios.get('https://api.opendota.com/api/heroes');
		console.log(response.data)
		return response.data;
	} catch (error) {
		console.error('Error fetching heroes:', error);
		return [];
	}
}


export default async function normalizeHeroesData() {
	const heroes = await fetchHeroes();

	const processedHeroes = heroes.map((hero: { name: string; id: number; localized_name: string; image: string }) => {
		const heroName = hero.name.replace("npc_dota_hero_", "");
		return {
			id: hero.id,
			name: heroName,
			localized_name: hero.localized_name,
			image: `https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`,
		};
	});
	console.log()

	Store.setHeroes(JSON.parse(JSON.stringify(processedHeroes)))

	return true
}
