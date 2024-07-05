import axios from "axios";
import cheerio from "cheerio";
import { HomeStore } from "shared/store/home";
import { IHero, ICounterHero } from "shared/utils/interfaces";

export default async function fetchCounters(hero: IHero): Promise<void> {
	const heroLocalizedName = hero.localized_name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
	const { data } = await axios.get(`https://www.dotabuff.com/heroes/${heroLocalizedName}/counters`);
	if (HomeStore.selectedHeroes.length >= 5) {
		console.log("Maximum number of selected heroes reached! No counters will be fetched.");
		return;
	}
	const counterHeroesData: { name: string; winrate: number }[] = [];
	const $ = cheerio.load(data);

	$("table.sortable tbody tr")
		.slice(0, 5)
		.each((index, element) => {
			const counterHeroName = $(element).find("td.cell-xlarge a").text().trim();
			const counterHeroWinrate = parseFloat($(element).find("td:nth-child(4)").text().trim().replace("%", ""));
			counterHeroesData.push({
				name: counterHeroName,
				winrate: counterHeroWinrate,
			});
		});

	const promises = counterHeroesData.map(async ({ name, winrate }) => {
		const counterHeroData = HomeStore.findHeroByLocalizedName(name);

		if (!counterHeroData) return;

		const existingHero = HomeStore.counterHeroes.get(name);

		if (existingHero) {
			const pickedIndex = existingHero.counterpicked.findIndex((picked) => picked.id === hero.id);
			if (pickedIndex !== -1) {
				HomeStore.removeCounterpickedHero(existingHero, pickedIndex);
			} else {
				HomeStore.addCounterpickedHero(existingHero, {
					id: hero.id,
					name: hero.name,
					image: hero.image,
					localized_name: hero.localized_name,
					selected: hero.selected,
					winrate,
				});
			}
		} else {
			const newCounterHero: ICounterHero = {
				id: counterHeroData.id,
				name: counterHeroData.name,
				image: counterHeroData.image,
				localized_name: name,
				selected: counterHeroData.selected,
				overallWinrate: winrate,
				counterpicked: [
					{
						id: hero.id,
						name: hero.name,
						image: hero.image,
						localized_name: hero.localized_name,
						selected: hero.selected,
						winrate,
					},
				],
			};

			HomeStore.pushHero(newCounterHero);
		}
	});

	await Promise.all(promises);

	// console.log(JSON.stringify(HomeStore.filteredCounterHeroes, null, 2));
}
