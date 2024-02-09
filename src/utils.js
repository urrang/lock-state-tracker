export const storage = {
	/**
	 * @returns {Promise<{ state: 'locked' | 'active', timestamp: number  }[]>}
	 */
	get: async () => {
		const res = await chrome.storage.sync.get('log');
		return res.log || [];
	},
	set: (value) => chrome.storage.sync.set({ log: value }),
	remove: (key) => chrome.storage.sync.remove('log'),
};

/**
 * @param {Date} d1
 * @param {Date} d2
 * @returns {boolean}
 */
export function isSameDate(d1, d2) {
	return d1.toDateString() === d2.toDateString();
}

/**
 * @param {Date} date
 * @param {number} days
 */
export function addDays(date, days) {
	date.setDate(date.getDate() - days);
}
