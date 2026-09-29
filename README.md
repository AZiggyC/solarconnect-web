# Solar Connect

Aussenauftritt von Solar Connect für Hauseigentümer, die eine Solaranlage planen.
Statisches HTML, kein Build-Schritt, kein Framework. Grundgerüst übernommen von
`~/Websites/swissprima`.

Das Prinzip: Solar Connect schaltet Anzeigen für Interessenten an Solaranlagen und
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

**Vorläufig.** Farben und Wortmarke sind ein Platzhalter-Design, bis die
Markenbasis von Luis da ist. Getauscht wird nur im Block `:root` in
`assets/style.css`, der Rest liest diese Variablen. Die Wortmarke steht als HTML
im Header und Footer (`.brand`), das Icon in `assets/icon.svg`.

## Offene Punkte

- Markenbasis einarbeiten (Farben, Logo, Schriften).
- Domain festlegen, danach `canonical`, `og:url`, `sitemap.xml` und `robots.txt` ergänzen.
- Kontaktadresse einrichten und an vier Stellen eintragen.
- Webhook-URL für das Formular eintragen (Zapier baut Luis).
- Datenschutz: Dienstleister, Hosting und Aufbewahrungsdauer eintragen.
- Bestätigen, dass jede Anfrage an genau einen Betrieb geht. Seite, FAQ und
  Datenschutz versprechen das so.
