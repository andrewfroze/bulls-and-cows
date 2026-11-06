import { type Settings } from '../types.module';

export interface LeaderboardEntry {
  attempts: number;
  time: number;
  settings: Settings;
  createdAt: number;
}

const STORAGE_KEY = 'bulls-and-cows-leaderboard';
const MAX_RECORDS = 10;

export function getLeaderboard(settings: Settings): LeaderboardEntry[] {
  const records = getAllRecords();

  return sortRecords(records.filter((record) => isSameMode(record.settings, settings))).slice(
    0,
    MAX_RECORDS,
  );
}

export function saveRecord(attempts: number, time: number, settings: Settings): LeaderboardEntry[] {
  const records = getAllRecords();

  const newRecord: LeaderboardEntry = {
    attempts,
    time,
    settings: { ...settings },
    createdAt: Date.now(),
  };

  const otherRecords = records.filter((record) => !isSameMode(record.settings, settings));

  const modeRecords = sortRecords([
    ...records.filter((record) => isSameMode(record.settings, settings)),
    newRecord,
  ]).slice(0, MAX_RECORDS);

  const updatedRecords = [...otherRecords, ...modeRecords];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));

  return modeRecords;
}

function getAllRecords(): LeaderboardEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const records: unknown = JSON.parse(stored);

    if (!Array.isArray(records)) {
      return [];
    }

    return records as LeaderboardEntry[];
  } catch {
    return [];
  }
}

function isSameMode(first: Settings, second: Settings): boolean {
  return first.base === second.base && first.length === second.length;
}

function sortRecords(records: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...records].sort((a, b) => a.attempts - b.attempts || a.time - b.time);
}

export function clearLeaderboard(): void {
  localStorage.removeItem(STORAGE_KEY);
}
