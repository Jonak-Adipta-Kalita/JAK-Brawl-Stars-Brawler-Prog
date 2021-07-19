const dex = document.getElementById('dex');
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
			<li class="card" onclick="selectBrawler(${brawleir.id})">
				<img class="card-image" src="${brawleir.image}"/>
				<h2 class="card-title">${brawleir.id}. ${brawleir.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = brawlersHTMLString;
};

const selectBrawler = async (id) => {
	const url = `/brawlers.json`;
	const res = await fetch(url);
	const brawleir = await res.json();
	displayPopup(brawleir, id);
};

const displayPopup = (brawleir, id) => {
	const image = `./images/${brawleir.brawlers[id - 1].image}`;
	const gadget = Array(brawleir.brawlers[id - 1].gadget).map((gadg) => gadg.join(", "));
	const starpower = Array(brawleir.brawlers[id - 1].starpower).map((star) => star.join(", "));
	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${brawleir.brawlers[id - 1].id + 1}. ${brawleir.brawlers[id - 1].name}
				</h2>
				<p>
					<small>Gadgets: </small>${gadget} | Star Powers: </small>${starpower}
				</p>
				<p>
					<small>Category: </small>${brawleir.brawlers[id - 1].category}
				</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchBrawlers();
