# O’Jeb — konfigurátor bundy

Živý web: https://feferooooni.github.io/ojeb-konfigurator/

Statická aplikace pro telefon a desktop bez sestavovacího kroku. GitHub Pages publikuje kořen větve `main`.

## Ovládání

- Klepnutí na díl bundy otevře výběr látky pod celým náhledem. Na širokém displeji je panel vedle bundy. Náhled zůstává viditelný a lze rovnou zvolit další díl. Pohledy Zepředu, Zezadu a Vnitřek sdílejí jeden návrh.
- Logo bundy je pouze na vnitřním štítku na podšívce. Vnější přední ani zadní pohled není označený. Stejně se vykresluje export PNG.
- Úvodní animovaná ruka ukazuje na rukáv. Po prvním výběru dílu se už nezobrazuje; respektuje omezený pohyb.
- Návrh nabízí vrácení a opakování změn. Trendy kombinace obsahují šest výchozích kombinací.
- Moje návrhy ukládají rozpracované bundy v tomto prohlížeči. Uložená bunda se otevře rovnou v přehledu pro sdílení a stažení PNG; do editoru se přejde tlačítkem Upravit. Nový návrh nebo trendy kombinace zachovají předchozí práci.
- Po první změně nebo úspěšném uložení návrhu se po pěti sekundách na Hotovo objeví dodaný zlatý paprsek (varianta B). Při ukládání je skrytý, při omezeném pohybu má statickou podobu. Na Sdílet obrázek se tento efekt nevztahuje.
- Hotovo vpravo nahoře potvrdí uložení a miniatura bundy přeletí do Moje návrhy. Poté se otevře souhrn s přejmenováním, stažením PNG a sdílením, pokud ho prohlížeč podporuje. Při omezeném pohybu se přelet přeskočí.
- Všech 17 vnějších barev nebo 18 podšívek je vidět najednou. Tipy vedle bundy reagují na zvolenou látku i ostatní barvy návrhu. Stránkování zůstává pouze u delších seznamů návrhů a připravených kombinací; krátké displeje mají v souhrnu přepínač Náhled/Látky.

## Ukládání a provoz

Návrhy se ukládají lokálně pod klíčem `ojeb-designs-v1`; nejsou synchronizované mezi zařízeními. Při nedostupném úložišti aplikace zobrazí stav „Jen v relaci“. Barvy aktuálního návrhu jsou také v URL za `#`. Návrat přes úvodní adresu bez `#` obnoví naposledy otevřený návrh. Odkaz s konkrétními barvami načte tuto kombinaci; dřívější návrhy zůstanou v Moje návrhy. Smazání dat prohlížeče odstraní i lokální návrhy.

Aplikace potřebuje internet pro React, písma a obrázky látek. Offline režim není implementovaný.

- `index.html` — šablona, styly a aplikační logika
- `assets/gold-comet.css`, `assets/gold-comet.js` — dodaný zlatý efekt na Hotovo
- `support.js` — runtime načítající React 18 z unpkg.com
- `fabrics/sw/`, `fabrics/swc/`, `fabrics/tile/` — náhledy a textury látek
- `.nojekyll` — vypnutí Jekyllu na GitHub Pages

Lokální spuštění: `python3 -m http.server 8765` v kořeni repozitáře.
