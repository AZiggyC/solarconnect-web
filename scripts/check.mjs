#!/usr/bin/env node
/**
 * Prueft die Solar-Connect-Website vor dem Livegang.
 *
 * Uebernommen von swissprima, dieselben drei Pruefungen:
 *
 * 1. Offene Platzhalter. Auf der Primex-Website standen erfundene Angaben im
 *    Code und wurden beim Durchsehen uebersehen. Hier sind sie mit
 *    [[PLATZHALTER: ...]] markiert und dieses Skript macht sie sichtbar.
 *    Dazu gehoert auch die Webhook-URL im Formular: ohne sie geht keine
 *    Anfrage raus.
 *
 * 2. Sichtbarer Bezug zu Primex auf der Seite. Solar Connect tritt wie
 *    swissprima als eigene Marke auf (Regel von Luis fuer swissprima,
 *    05.09.2026, hier gleich angewendet). Ausgenommen sind die beiden
 *    Rechtstexte, dort verlangt das Gesetz die Nennung der verantwortlichen
 *    Stelle.
 *
 * 3. Ein API-Schluessel in einer versionierten Datei. Ein 64 Zeichen langer
 *    Hex-String gehoert in .env oder in die GitHub-Secrets, nie ins
 *    Repository.
 *
 * Aufruf:  node scripts/check.mjs
 * Beendet sich mit Code 1, solange etwas offen ist.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { execFileSync } from 'node:child_process'

const WURZEL = new URL('..', import.meta.url).pathname.replace(/\/$/, '')

const IGNORIEREN = new Set(['node_modules', '.git', 'scripts', 'assets'])

/** Dateien, in denen der Name Primex stehen darf. */
const PRIMEX_ERLAUBT = ['datenschutz/index.html', 'impressum/index.html']

function dateien(pfad) {
  return readdirSync(pfad).flatMap((name) => {
    if (IGNORIEREN.has(name)) return []
    const voll = join(pfad, name)
    if (statSync(voll).isDirectory()) return dateien(voll)
    return /\.html$/.test(name) ? [voll] : []
  })
}

/** Alle versionierten Dateien, fuer die Schluesselsuche. */
function versionierteDateien() {
  try {
    return execFileSync('git', ['ls-files'], { cwd: WURZEL, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
  } catch {
    return []
  }
}

const platzhalter = []
const primexTreffer = []

for (const datei of dateien(WURZEL)) {
  const kurz = relative(WURZEL, datei)
  const zeilen = readFileSync(datei, 'utf8').split('\n')

  zeilen.forEach((zeile, i) => {
    const p = zeile.match(/\[\[PLATZHALTER:\s*([^\]]+)\]\]/)
    if (p) platzhalter.push({ datei: kurz, zeile: i + 1, was: p[1].trim() })

    if (/primex/i.test(zeile) && !PRIMEX_ERLAUBT.includes(kurz)) {
      primexTreffer.push({ datei: kurz, zeile: i + 1, text: zeile.trim().slice(0, 110) })
    }
  })
}

/* Schluessel im Repository? */
const SCHLUESSEL = /\b[0-9a-f]{64}\b/
const schluesselTreffer = []
for (const rel of versionierteDateien()) {
  let inhalt
  try {
    inhalt = readFileSync(join(WURZEL, rel), 'utf8')
  } catch {
    continue // Binaerdatei oder geloescht
  }
  inhalt.split('\n').forEach((zeile, i) => {
    if (SCHLUESSEL.test(zeile)) schluesselTreffer.push({ datei: rel, zeile: i + 1 })
  })
}

let fehler = false

if (schluesselTreffer.length) {
  fehler = true
  console.log(`\nMoeglicher API-Schluessel in einer versionierten Datei: ${schluesselTreffer.length}\n`)
  for (const t of schluesselTreffer) console.log(`  ${t.datei}:${t.zeile}`)
  console.log('\n  Schluessel gehoeren in .env oder in die GitHub-Secrets, nie ins Repository.')
  console.log('  Wenn hier wirklich einer steht: entfernen UND beim Anbieter neu ausrollen,')
  console.log('  denn er steckt dann auch in der Git-Historie.\n')
}

if (platzhalter.length) {
  fehler = true
  console.log(`\nOffene Platzhalter: ${platzhalter.length}\n`)
  for (const t of platzhalter) {
    console.log(`  ${t.datei}:${t.zeile}`)
    console.log(`    ${t.was}\n`)
  }
}

if (primexTreffer.length) {
  fehler = true
  console.log(`\nPrimex auf der Seite sichtbar: ${primexTreffer.length}\n`)
  for (const t of primexTreffer) {
    console.log(`  ${t.datei}:${t.zeile}`)
    console.log(`    ${t.text}\n`)
  }
  console.log('  Regel: Solar Connect zeigt oeffentlich keine Verbindung zu Primex.')
  console.log('  Erlaubt nur in: ' + PRIMEX_ERLAUBT.join(', ') + '\n')
}

if (fehler) {
  console.log('Nicht bereit fuer den Livegang.\n')
  process.exit(1)
}

console.log('\nKeine offenen Platzhalter, kein sichtbarer Primex-Bezug. Bereit.\n')
