# solarconnect

Aussenauftritt von solarconnect für Hauseigentümer, die eine Solaranlage planen.
Statisches HTML, kein Build-Schritt, kein Framework. Grundgerüst übernommen von
`~/Websites/swissprima`.

Das Prinzip: solarconnect schaltet Anzeigen für Interessenten an Solaranlagen und
verteilt die Anfragen an Fachbetriebe. Die Seite sagt dem Interessenten: Wir prüfen,
welcher Betrieb für dich am besten passt, und stellen den Kontakt her.

## Aufbau

```
index.html            Startseite mit Anfrageformular in vier Schritten
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

## Anfrageformular

Die Fragen sind dieselben wie im SolarHai-Referenzformular `998763076243603`
(siehe Vault, `Instant Formular schlaegt den Funnel bei Leadgen.md`), damit
Website-Anfragen und Meta-Formular-Leads dieselben Felder tragen:

1. Eigentümer der Immobilie? Ja / Nein. Bei Nein endet das Formular freundlich.
2. Stromverbraucher, Mehrfachauswahl
3. Zeitpunkt der Umsetzung
4. Name, PLZ, Telefon, E-Mail, Einwilligung zur Weitergabe an einen Betrieb

Abgeschickt wird per `POST` an die URL in `data-endpoint` am `<form id="quiz">`,
als Formulardaten (kein JSON, damit der Browser keinen Preflight schickt).
Gedacht für einen Zapier Catch Hook. Felder:

`eigentuemer`, `verbraucher`, `zeitpunkt`, `name`, `plz`, `telefon`, `email`,
`quelle` (immer `Website`), `seite`.

Ein verstecktes Feld `firma` fängt Bots ab. Ist es gefüllt, geht nichts raus.

## Vor dem Livegang

```bash
npm run check
```

Bricht ab, solange ein `[[PLATZHALTER: ...]]` im Code steht, das Wort Primex
ausserhalb der Rechtstexte vorkommt oder ein API-Schlüssel versioniert ist.
Platzhalter sind im Browser gelb gestrichelt markiert.

## Marke

Nach dem Brand Guide 1.0 vom September 2026 (`solarconnect_Brand-Guide.pdf`, im Vault
unter `07 Anhänge/`). Schreibweise immer **solarconnect**, klein und zusammen.

| Rolle | Hex | Einsatz |
|---|---|---|
| Solar-Rot | `#B94336` | Logo, CTA-Button, Eyebrow, Icons. Sparsam. |
| Anthrazit | `#1A1A1A` | Headlines, «connect» auf Hell, dunkle Flächen |
| Grau | `#555555` | Fliesstext, Hinweise |
| Amber | `#F0D3A8` | nur Deko: Punktmuster |
| Weiss | `#FFFFFF` | Flächen |

Richtwert Farbverteilung: Weiss 55, Anthrazit 25, Rot 10, Grau 6, Amber 4 Prozent.

Schrift: Poppins, Bold für Headlines, Regular für Text. Buttons Radius 14 px, Bold, weiss auf Rot.
Nummerierte Schritte als rote Kreise mit weisser Zahl, Vorteile mit Häkchen im Kreis (max. 3),
Punktmuster in Amber nur in einer leeren Ecke.

Zwei Ableitungen, die nicht im Guide stehen: `--brand-light` `#E0705F` für rote Schrift auf
Anthrazit (das Original-Rot ist dort zu schwach für kleine Schrift) und ein Hellbeige
`#F7F4EF` für graue Abschnitte, wie die Kartenflächen im Guide.

Logo: Bildmarke in `assets/icon.svg` (auch Favicon), Wortmarke als HTML in `.brand`
(«solar» rot, «connect» anthrazit, auf Dunkel weiss). Laut Guide verboten: Farben der
Wortmarke ändern, andere Schrift, Partner-Firmennamen dazustellen.

**Nicht übernommen:** Die Trust-Zeile aus dem Guide («4.9 Google-Bewertung · 30+ Installationen»)
ist ein Gestaltungsbeispiel und keine belegte Zahl. Kommt erst auf die Seite, wenn es echte Werte gibt.

## Offene Punkte

- Domain festlegen, danach `canonical`, `og:url`, `sitemap.xml` und `robots.txt` ergänzen.
- Kontaktadresse einrichten und an vier Stellen eintragen.
- Webhook-URL für das Formular eintragen (Zapier baut Luis).
- Datenschutz: Dienstleister, Hosting und Aufbewahrungsdauer eintragen.
- Bestätigen, dass jede Anfrage an genau einen Betrieb geht. Seite, FAQ und
  Datenschutz versprechen das so.
