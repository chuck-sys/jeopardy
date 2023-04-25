/**
 * We will store all data within the browser local storage. Here is the schema.
 *
 * jeopardy-saves: a list of strings that represent the names of the saves
 *
 * jeopardy-save-<string>: a save object
 *      last-save: <date>
 *      data: list of <category>
 *      config: <config>
 *
 * <config>: the config
 *
 * <category>: a single category
 *      name: <string>
 *      description: <string>
 *      questions: list of <question>
 *
 * <question>: a single question
 *      content: <string>
 *      answer: <string>
 *      points: <int>
 */
import { inflate, gzip } from 'pako';

export interface ISave {
  data: ICategory[],
  config: IConfig,
}

export interface IConfig {
  autoSave: boolean,
}

export interface ICategory {
  name: string,
  questions: IQuestion[],
}

export interface IQuestion {
  content: string,
  answer: string,
  points: number,
}

export function emptyConfigData(): IConfig {
  return {
    autoSave: false,
  };
}

export function emptySaveData(): ISave {
  return {
    data: [],
    config: emptyConfigData(),
  };
}

/**
 * Gets the list of save names from local storage.
 */
export function getSaveNamesFromLocalStorage(): string[] {
  const key = 'jeopardy-saves';
  const saveNamesString = localStorage.getItem(key);
  if (saveNamesString) {
    return JSON.parse(saveNamesString);
  } else {
    return [];
  }
}

/**
 * Set the list of save names in local storage.
 */
export function saveSaveNamesToLocalStorage(saveNames: string[]) {
  const key = 'jeopardy-saves';
  localStorage.setItem(key, JSON.stringify(saveNames));
}

/**
 * Load the name of the default save slot from local storage.
 *
 * Gives `default` if none are found.
 */
export function loadDefaultSaveNameFromLocalStorage(): string {
  const key = 'jeopardy-default-save';
  return localStorage.getItem(key) || 'default';
}

/**
 * Load save data from local storage.
 */
export function loadSaveFromLocalStorage(saveName: string): ISave | null {
  const key = `jeopardy-save-${saveName}`;
  const saveString = localStorage.getItem(key);
  if (saveString) {
    return loadSaveFromBase64(saveString);
  } else {
    return null;
  }
}

/**
 * Convert base64 blob into save data.
 */
export function loadSaveFromBase64(b64: string): ISave | null {
  try {
    const compressed = Uint8Array.from(
      atob(b64)
        .split('')
        .map((c) => c.charCodeAt(0))
    );
    return JSON.parse(inflate(compressed).toString());
  } catch (e: any) {
    console.error(e);
    return null;
  }
}

/**
 * Convert save object into base64 blob.
 */
export function saveToBase64(save: ISave): string {
  const compressed = gzip(JSON.stringify(save));
  return btoa(compressed.toString());
}

/**
 * Save data to corresponding save.
 *
 * Updates the list of save slots. Does not update the default save name.
 */
export function saveToLocalStorage(saveName: string, save: ISave) {
  const key = `jeopardy-save-${saveName}`;
  localStorage.setItem(key, saveToBase64(save));

  const saveNames = getSaveNamesFromLocalStorage();
  if (!saveNames.includes(saveName)) {
    saveNames.push(saveName);
  }
  saveSaveNamesToLocalStorage(saveNames);
}
