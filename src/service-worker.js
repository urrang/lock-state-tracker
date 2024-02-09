import { storage, isSameDay } from './utils.js';

chrome.idle.onStateChanged.addListener(async (state) => {
	// Ignore idle states
	if (state === 'active' || state === 'locked') {
		let log = await storage.get();

		// Ignore active states that does not follow a locked state (idle -> active)
		if (state === 'active') {
			const lastEntry = log[log.length - 1];
			const entryWasToday = isSameDay(new Date(lastEntry.timestamp), new Date());
			if (entryWasToday && lastEntry.state !== 'locked') {
				return;
			}
		}

		log.push({ state, timestamp: Date.now() });

		if (log.length > 500) {
			log = log.slice(100);
		}

		storage.set(log);
	}
});

