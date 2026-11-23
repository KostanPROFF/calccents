import { test } from 'node:test';
import assert from 'node:assert/strict';

import { preferredLocale } from './languageChoice.ts';

const ALL = ['en', 'ru', 'es', 'zh', 'ko', 'vi', 'pt', 'ar', 'tl', 'uk'];

test('preferredLocale matches a regional tag on its language', () => {
  assert.equal(preferredLocale(['zh-CN', 'en'], ALL), 'zh');
  assert.equal(preferredLocale(['zh-Hant-TW'], ALL), 'zh');
  assert.equal(preferredLocale(['pt-BR'], ALL), 'pt');
  assert.equal(preferredLocale(['es_419'], ALL), 'es');
});

test('preferredLocale follows the order the reader set', () => {
  assert.equal(preferredLocale(['en-US', 'zh-CN'], ALL), 'en');
  assert.equal(preferredLocale(['de-DE', 'ru', 'en'], ALL), 'ru');
});

test('preferredLocale skips languages the page is not available in', () => {
  assert.equal(preferredLocale(['zh-CN', 'en'], ['en', 'ru']), 'en');
  assert.equal(preferredLocale(['de', 'fr'], ALL), undefined);
  assert.equal(preferredLocale([], ALL), undefined);
});

test('preferredLocale reads Filipino as Tagalog', () => {
  assert.equal(preferredLocale(['fil-PH'], ALL), 'tl');
});

test('preferredLocale ignores case and stray spaces', () => {
  assert.equal(preferredLocale([' ZH-cn '], ALL), 'zh');
  assert.equal(preferredLocale([''], ALL), undefined);
});
