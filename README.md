# solarconnect

Aussenauftritt von solarconnect für Hauseigentümer, die eine Solaranlage planen.
Statisches HTML, kein Build-Schritt, kein Framework. Grundgerüst übernommen von
`~/Websites/swissprima`.

Das Prinzip: solarconnect schaltet Anzeigen für Interessenten an Solaranlagen und
verteilt die Anfragen an Fachbetriebe. Die Seite sagt dem Interessenten: Wir prüfen,
welcher Betrieb für dich am besten passt, und stellen den Kontakt her.

## Aufbau

```
index.html            Startseite, alle CTAs führen in den Funnel
datenschutz/          Datenschutzerklärung
impressum/            Impressum
assets/               Stylesheet, Icon
scripts/check.mjs     Prüfung vor dem Livegang
```

## Lokal ansehen

```bash
npm run dev
```

Läuft danach auf http://localhost:4175

## Solar-Check

Die Website hat kein eigenes Formular. Jeder Button «Solar-Check starten» führt in den
Perspective-Funnel unter https://check.solar-connect.ch/anfrage/ (Domain im
Perspective-Workspace, Stand 01.10.2026). Dort laufen Fragen, Kontaktdaten,
Automails und Meta-Pixel.

Der Funnel antwortet auf Skriptanfragen mit 403 (Cloudflare), wie bei swissprima.
Ob der Link lebt, lässt sich deshalb nur im Browser prüfen.

## Vor dem Livegang

```bash
npm run check
```

Bricht ab, solange ein `[[PLATZHALTER: ...]]` im Code steht, das Wort Primex
ausserhalb der Rechtstexte vorkommt oder ein API-Schlüssel versioniert ist.
Platzhalter sind im Browser gelb gestrichelt markiert.

## Marke

Nach dem Brand Guide 1.1 vom 30.09.2026 (`Artifacts/solarconnect-brand.html` im Vault).
Version 1.0 liegt als PDF unter `07 Anhänge/`. Schreibweise immer **solarconnect**, klein und zusammen.

| Rolle | Hex | Einsatz |
|---|---|---|
| Rot | `#DA291C` | Logo, CTA-Button, Eyebrow, Icons. Sparsam. |
| Dunkel | `#111418` | Headlines, «connect» auf Hell, dunkle Flächen |
| Grau | `#555555` | Fliesstext, Hinweise |
| Amber | `#F0D3A8` | nur Deko: Punktmuster |
| Weiss | `#FFFFFF` | Flächen |

**Abweichung vom Guide (Luis, 30.09.2026):** Rot ist `#DA291C` statt `#B94336`, Dunkel `#111418` statt `#1A1A1A`. Die Website gilt, das PDF ist in diesem Punkt veraltet.

Richtwert Farbverteilung: Weiss 55, Anthrazit 25, Rot 10, Grau 6, Amber 4 Prozent.

Schrift: Poppins, Bold für Headlines, Regular für Text. Buttons Radius 14 px, Bold, weiss auf Rot.
Nummerierte Schritte als rote Kreise mit weisser Zahl, Vorteile mit Häkchen im Kreis (max. 3),
Punktmuster in Amber nur in einer leeren Ecke.

Zwei Ableitungen, die nicht im Guide stehen: `--brand-light` `#FF4C3B` für rote Schrift auf
Dunkel (das Hauptrot ist dort zu schwach für kleine Schrift), Hover `#A31B12` und ein Hellbeige
`#F7F4EF` für graue Abschnitte, wie die Kartenflächen im Guide.

Logo: Bildmarke in `assets/icon.svg` (auch Favicon), Wortmarke als HTML in `.brand`
(«solar» rot, «connect» anthrazit, auf Dunkel weiss). Laut Guide verboten: Farben der
Wortmarke ändern, andere Schrift, Partner-Firmennamen dazustellen.

**Nicht übernommen:** Die Trust-Zeile aus dem Guide («4.9 Google-Bewertung · 30+ Installationen»)
ist ein Gestaltungsbeispiel und keine belegte Zahl. Kommt erst auf die Seite, wenn es echte Werte gibt.

## Offene Punkte

- Domain festlegen, danach `canonical`, `og:url`, `sitemap.xml` und `robots.txt` ergänzen.
- Kontaktadresse einrichten und an vier Stellen eintragen.
- Datenschutz: Hosting-Anbieter eintragen.
- Bestätigen, dass jede Anfrage an genau einen Betrieb geht. Seite, FAQ und
  Datenschutz versprechen das so.
