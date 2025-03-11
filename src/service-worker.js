import { getDateString, getEntriesByDate, setEntriesOnDate, isSameDay, runStorageCleanup } from './utils.js';

let cleanupDate;

chrome.idle.onStateChanged.addListener(async (state) => {
    // Ignore idle states
    if (state === 'active' || state === 'locked') {
        const date = new Date();
        let entries = await getEntriesByDate(date);

        // Ignore active states that does not follow a locked state (idle -> active)
        if (state === 'active') {
            const lastEntry = entries[entries.length - 1];
            const entryWasToday = lastEntry && isSameDay(new Date(lastEntry.timestamp), date);
            if (entryWasToday && lastEntry.state !== 'locked') {
                return;
            }
        }

        entries.push({ state, timestamp: Date.now() });
        setEntriesOnDate(date, entries);

        // Only run cleanup once per day
        const dateString = getDateString(new Date());
        if (dateString !== cleanupDate) {
            runStorageCleanup();
            cleanupDate = dateString;
        }
    }
});

