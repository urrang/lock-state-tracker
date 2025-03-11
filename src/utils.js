/**
 * @param {Date} date
 */
export function getDateString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * @param {Date} date
 * @returns {Promise<{ state: 'locked' | 'active', timestamp: number  }[]>}
 */
export async function getEntriesByDate(date) {
    const storageKey = getDateString(date);
    const res = await chrome.storage.sync.get(storageKey);
    return res[storageKey] || [];
}

/**
 * @param {Date} date
 * @param {Array<{ state: 'locked' | 'active', timestamp: number  }> entries
 */
export function setEntriesOnDate(date, entries) {
    const storageKey = getDateString(date);
    chrome.storage.sync.set({ [storageKey]: entries })
}

export async function runStorageCleanup() {
    console.time('StorageCleanup');
    const items = await chrome.storage.sync.get(null);
    const keys = Object.keys(items).toSorted((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });

    const dropKeys = keys.slice(10);
    for (const key of dropKeys) {
        chrome.storage.sync.remove(key);
    }

    console.timeEnd('StorageCleanup');
    console.log(`Dropped ${dropKeys.length} items`);
}

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
