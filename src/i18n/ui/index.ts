/**
 * The dictionary registry.
 *
 * Every locale's strings live in their own file next to this one, and they
 * all have the same shape as `en.ts`. The English file is the reference: a
 * missing key in a translation is a type error, not a blank on the page.
 */

import { en, type UiDictionary } from './en.ts';
import { ru } from './ru.ts';
import { es } from './es.ts';
import { zh } from './zh.ts';
import { ko } from './ko.ts';
import { vi } from './vi.ts';
import { pt } from './pt.ts';
import { ar } from './ar.ts';
import { tl } from './tl.ts';
import { uk } from './uk.ts';
import { DEFAULT_LOCALE, type Locale } from '../locales.ts';

export type { UiDictionary };

export const UI: Record<Locale, UiDictionary> = { en, ru, es, zh, ko, vi, pt, ar, tl, uk };

export function getUi(locale: Locale): UiDictionary {
  return UI[locale] ?? UI[DEFAULT_LOCALE];
}

export { fill } from './en.ts';
