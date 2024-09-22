const axios = require('axios');
const cheerio = require('cheerio');

async function fetchCounters(hero: string) {
	const url = `https://www.dotabuff.com/heroes/${hero}/counters`;
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const counters: any = [];
	$('table.sortable tbody tr').each((index: number, element: string) => {
		if (index >= 5) return false; // Limit to 5 characters

		const heroName = $(element).find('td.cell-xlarge a').text().trim();
		const disadvantage = $(element).find('td:nth-child(3)').text().trim();
		const winrateVsHero = $(element).find('td:nth-child(4)').text().trim();

		counters.push({ hero: heroName, disadvantage, winrateVsHero });
	});
	console.log(counters);
	return counters;
}

fetchCounters('bristleback');
