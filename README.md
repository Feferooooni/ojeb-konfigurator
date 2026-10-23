# O'Jeb – konfigurátor bundy

Statický web, žádný build. Stačí nahrát obsah této složky do kořene repozitáře a zapnout GitHub Pages.

## Obsah

- `index.html` – celá aplikace (šablona + logika)
- `support.js` – runtime; načítá React 18 z unpkg.com (potřebuje internet)
- `fabrics/sw/` – náhledy látek (160 px)
- `fabrics/swc/` – oříznuté náhledy jednobarevného softshellu
- `fabrics/tile/` – bezešvé dlaždice vzorů pro bundu
- `.nojekyll` – vypne Jekyll, aby GitHub Pages servíroval soubory tak, jak jsou

## Pokyny pro agenta – nasazení na GitHub Pages

1. Vytvoř nový veřejný repozitář, např. `ojeb-konfigurator`.
2. Nahraj **obsah** této složky do kořene repozitáře (včetně `.nojekyll`), větev `main`.
   ```bash
   git init && git add -A && git commit -m "O'Jeb konfigurátor"
   git branch -M main
   git remote add origin git@github.com:<uzivatel>/ojeb-konfigurator.git
   git push -u origin main
   ```
   Nebo s GitHub CLI: `gh repo create ojeb-konfigurator --public --source=. --push`
3. Zapni Pages: Settings → Pages → Source: **Deploy from a branch** → Branch `main`, složka `/ (root)`.
   Přes CLI: `gh api -X POST repos/<uzivatel>/ojeb-konfigurator/pages -f "source[branch]=main" -f "source[path]=/"`
4. Po 1–2 minutách běží na `https://<uzivatel>.github.io/ojeb-konfigurator/`.
5. Ověř: stránka se načte, bunda je vidět, klik na díl + klik na látku mění barvu, v konzoli nejsou 404 na `fabrics/...`.

Poznámky:
- Neměň názvy ani strukturu složek – cesty k obrázkům jsou relativní (`fabrics/...`).
- Názvy souborů jsou case-sensitive (GitHub Pages běží na Linuxu).
- Kombinace se ukládá do URL za `#` – odkaz lze sdílet.
- Pod šířkou 720 px se zapne mobilní rozložení (bunda nahoře, díly v pruhu, záložky dole, swipe = otočení).
