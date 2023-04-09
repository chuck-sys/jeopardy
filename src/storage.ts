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
import { inflate, gzip } from 'pako'

export interface ISave {
  last_save: Date
  data: ICategory[]
  config: IConfig
}

export interface IConfig {}

export interface ICategory {
  name: string
  questions: IQuestion[]
}

export interface IQuestion {
  content: string
  answer: string
  points: number
}

export function getSaveNamesFromLocalStorage(): string[] {
  const key = 'jeopardy-saves'
  const saveNamesString = localStorage.getItem(key)
  if (saveNamesString) {
    return JSON.parse(saveNamesString)
  } else {
    return []
  }
}

export function loadSaveFromLocalStorage(saveName: string): ISave | null {
  const key = `jeopardy-save-${saveName}`
  const saveString = localStorage.getItem(key)
  if (saveString) {
    return loadSaveFromBase64(saveString)
  } else {
    return null
  }
}

export function loadSaveFromBase64(b64: string): ISave | null {
  try {
    const compressed = Uint8Array.from(
      atob(b64)
        .split('')
        .map((c) => c.charCodeAt(0))
    )
    return JSON.parse(inflate(compressed).toString())
  } catch (e: any) {
    console.error(e)
    return null
  }
}

export function saveToBase64(save: ISave): string {
  const compressed = gzip(JSON.stringify(save))
  return btoa(compressed.toString())
}

export function saveToLocalStorage(saveName: string, save: ISave) {
  const key = `jeopardy-save-${saveName}`
  localStorage.setItem(key, saveToBase64(save))
}
