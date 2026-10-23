# O’Jeb — konfigurátor bundy

Živý web: https://feferooooni.github.io/ojeb-konfigurator/

Statická aplikace pro telefon a desktop bez sestavovacího kroku. GitHub Pages publikuje kořen větve `main`.

## Ovládání

- Klepnutí na díl bundy otevře výběr látky pod celým náhledem. Na širokém displeji je panel vedle bundy. Náhled zůstává viditelný a lze rovnou zvolit další díl. Pohledy Zepředu, Zezadu a Vnitřek sdílejí jeden návrh.
- Úvodní animovaná ruka ukazuje na rukáv. Po prvním výběru dílu se už nezobrazuje; respektuje omezený pohyb.
- Návrh nabízí vrácení a opakování změn. Inspirace obsahuje šest výchozích kombinací.
- Moje návrhy ukládají rozpracované bundy v tomto prohlížeči. Nový návrh nebo inspirace zachovají předchozí práci.
- Hotovo otevře souhrn, přejmenování, stažení PNG a sdílení obrázku, pokud ho prohlížeč podporuje. Jinak se otevře náhled obrázku.
- Na menších displejích mají katalogy stránkování a souhrn přepínač Náhled/Látky, aby ovládání zůstalo dostupné bez posouvání stránky.

## Ukládání a provoz

Návrhy se ukládají lokálně pod klíčem `ojeb-designs-v1`; nejsou synchronizované mezi zařízeními. Při nedostupném úložišti aplikace zobrazí stav „Jen v relaci“. Barvy aktuálního návrhu jsou také v URL za `#`.

Aplikace potřebuje internet pro React, písma a obrázky látek. Offline režim není implementovaný.

- `index.html` — šablona, styly a aplikační logika
- `support.js` — runtime načítající React 18 z unpkg.com
- `fabrics/sw/`, `fabrics/swc/`, `fabrics/tile/` — náhledy a textury látek
- `.nojekyll` — vypnutí Jekyllu na GitHub Pages

Lokální spuštění: `python3 -m http.server 8765` v kořeni repozitáře.
