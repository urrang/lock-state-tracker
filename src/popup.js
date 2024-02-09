import { addDays, isSameDay, storage, formatDate, formatTime } from './utils.js';

let date = new Date();
let logItems = [];

const dayLabel = document.getElementById('day-label');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const mainSection = document.querySelector('main');

prevBtn.addEventListener('click', () => {
	addDays(date, -1);
	render();
});

nextBtn.addEventListener('click', () => {
	addDays(date, 1);
	render();
});

function render() {
	dayLabel.innerText = formatDate(date);

	const items = logItems.filter(item => {
		return isSameDay(new Date(item.timestamp), date);
	});

	if (!items.length) {
		mainSection.innerHTML = 'No log items for this day';
		return;
	}

	const listItems = items.map(item => `
		<li class="${item.state}">
			<span class="timestamp">${formatTime(item.timestamp)}</span>	
			<span class="state">${item.state}</span>	
		</li>
	`);

	mainSection.innerHTML = `<ul>${listItems.join('')}</ul>`;
}

storage.get().then(items => {
	logItems = items;
	render();
});

