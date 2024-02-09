import { addDays, storage } from './utils.js';

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
	dayLabel.innerText = date.toDateString();

	mainSection.innerHTML = `
		Log count: ${logItems.length}
	`;
}

render();
storage.get().then(items => {
	logItems = items;
	render();
});


// class LogView extends HTMLElement {
//
// 	connectedCallback() {
// 		storage.get().then(items => render(items));
// 	}
//
// 	render(items) {
// 		
// 	}
// }
