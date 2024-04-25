import { getEntriesByDate, formatDate, formatTime, runStorageCleanup } from './utils.js';

let date = new Date();

const dayLabel = document.getElementById('day-label');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const mainSection = document.querySelector('main');

prevBtn.addEventListener('click', () => {
	date.setDate(date.getDate() - 1);
	render();
});

nextBtn.addEventListener('click', () => {
	date.setDate(date.getDate() + 1);
	render();
});

async function render() {
	dayLabel.innerText = formatDate(date);

	const entries = await getEntriesByDate(date);

	if (!entries.length) {
		mainSection.innerHTML = '<div class="empty-state">No log items for this day</div>';
		return;
	}

	const listItems = entries.map(item => {
		let icon = '<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>';

		if (item.state === 'locked') {
			icon = '<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>';
		}

		return `
			<li class="${item.state}">
				${icon}
				<span>${item.state}</span>	
				<strong>${formatTime(item.timestamp)}</strong>	
			</li>
		`
	});

	mainSection.innerHTML = `<ul>${listItems.join('')}</ul>`;
}

render();
