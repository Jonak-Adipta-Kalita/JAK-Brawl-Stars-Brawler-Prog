const dex = document.getElementById('dex');
let brawlerCache = {};
const fetchBrawlers = async () => {
    const url = "/brawlers.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const brawlers = data.brawlers.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayBrawlers(brawlers);
};

const displayBrawlers = (brawler) => {
    const brawlersHTMLString = brawler
        .map((brawleir) => (`
			<li class="card">
				<img class="card-image" src="${brawleir.image}"/>
				<h2 class="card-title">${brawleir.id}. ${brawleir.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = brawlersHTMLString;
};

fetchBrawlers();
