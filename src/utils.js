export const storage = {
	/**
	 * @returns {Promise<{ state: 'locked' | 'active', timestamp: number  }[]>}
	 */
	get: async () => {
		const res = await chrome.storage.sync.get('log');
		console.log(res.log || []);
		return res.log || [];
	},
	set: (value) => chrome.storage.sync.set({ log: value }),
	remove: (key) => chrome.storage.sync.remove('log'),
};

/**
 * @param {Date|number} date
 * @returns {string}
 */
export function formatDate(date) {
	return new Intl.DateTimeFormat(navigator.language, {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	}).format(new Date(date));
}

/**
 * @param {Date|number} date
 * @returns {string}
 */
export function formatTime(date) {
	return new Intl.DateTimeFormat(navigator.language, {
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(date));
}


/**
 * @param {Date} d1
 * @param {Date} d2
 * @returns {boolean}
 */
export function isSameDay(d1, d2) {
	return d1.toDateString() === d2.toDateString();
}

/**
 * @param {Date} date
 * @param {number} days
 */
export function addDays(date, days) {
	date.setDate(date.getDate() - days);
}
