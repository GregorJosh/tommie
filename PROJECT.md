# Tommie — dokument projektu

Aktualizacja: 2026-11-08.

## Opis

Robocza nazwa gry to **Tommie**. To jednoosobowa gra łącząca widok FPP inspirowany dungeon crawlerami, takimi jak Dungeon Master, z trybem Point & Click w lokacjach na zewnątrz. Gracz steruje jedną całkowicie fikcyjną postacią we współczesnej Świdnicy. Świat obejmuje ulice, chodniki, bramy, parki i budynki. Klimat fabularny czerpie inspirację z Resident Evil i historii Raccoon City, ale szczegóły fabuły nadal są otwarte.

Docelowa oprawa jest pikselowa i retro. Pierwszą platformą będzie przeglądarka; Android można rozważyć później.

## Ustalone założenia rozgrywki

- Na zewnątrz obowiązuje tryb Point & Click z widoczną postacią chodzącą po scenie, inspirowany przygodówkami takimi jak Monkey Island.
- Wnętrza korzystają z widoku FPP: ruchu po siatce o jedno pole i obrotów o 90 stopni.
- Oba widoki dotyczą tej samej postaci; kod przechowuje osobno jej pozycję na scenie zewnętrznej i pozycję z kierunkiem na siatce wnętrza.
- Ruch we wnętrzu jest blokowany na niedostępnych polach. Na zewnątrz punkt pod stopami postaci może poruszać się po połączonych obszarach chodnika i przejść między samochodami.
- Pierwszy krótki scenariusz łączy oba tryby: znalezienie kartki na ulicy, wejście do budynku, znalezienie klucza i otwarcie bramy. Wszystkie te etapy już działają.
- Walkę, przeciwników i rozbudowany ekwipunek odkładamy na później.
- Logika gry ma być oddzielona od renderowania i obsługi HTML.

## Wybrana technologia

- Visual Studio Code — edytor.
- TypeScript z Vite i szablonem `vanilla-ts` — aplikacja przeglądarkowa bez frameworka.
- Canvas 2D — rysowanie widoku gry.
- HTML i CSS — interfejs.
- Git — wybrane narzędzie kontroli wersji.

Nie używamy Reacta, Next.js, Three.js ani dodatkowego silnika gry.

## Aktualny stan projektu

Prototyp działa w przeglądarce i obsługuje oba tryby. Gra rozpoczyna się na scenie zewnętrznej. Interfejs HTML tworzy moduł `ui.ts`, a widok jest rysowany na canvasie o rozmiarze 649 × 360 pikseli.

### Na zewnątrz — Point & Click

- Scena przedstawia kamienicę przy ul. Siennej, chodnik i trzy zaparkowane samochody. Tło bez samochodów zawiera nawierzchnię oraz cienie aut. Srebrne, zielone i czerwone auto są oddzielnymi przezroczystymi warstwami rysowanymi przed postacią, dlatego zasłaniają ją, gdy przechodzi za nimi.
- Kliknięcie dostępnego miejsca wyznacza cel. Postać porusza się płynnie i zatrzymuje po dotarciu. Dostępny teren jest sumą prostokątnego chodnika oraz dwóch węższych przejść między samochodami. Kliknięcia poza dostępnymi obszarami i obiektami interaktywnymi są ignorowane, także podczas marszu.
- Trasa najpierw sprawdza, czy cały odcinek do celu mieści się w dostępnych obszarach. Jeżeli nie, tworzy punkty pośrednie prowadzące przez chodnik. Przy przejściu pomiędzy autami obejście biegnie blisko jego dolnej krawędzi zamiast zawsze przez środek. Nowe poprawne kliknięcie zastępuje wcześniejszą trasę i zamiar interakcji.
- Współrzędne postaci oznaczają punkt pod jej stopami. Wielkość postaci zależy od jej położenia w pionie, a pod stopami rysowany jest cień.
- Postać przechowuje kierunek `up`, `down`, `left` albo `right`, wyznaczany z dominującej składowej aktualnego odcinka ruchu. Kierunek zmienia się również na zakrętach trasy i pozostaje zachowany po zatrzymaniu.
- Działają sześcioklatkowe animacje chodu w prawo, w górę i w dół; ruch w lewo korzysta z poziomego odbicia chodu w prawo. Każda klatka ma 144 × 144 piksele, a chód używa 100 ms na klatkę. Dla postoju bokiem działa sześcioklatkowa animacja bezczynności z czasem 250 ms na klatkę. Postój skierowany w górę i w dół korzysta z osobnych czteroklatkowych arkuszy bezczynności, również odtwarzanych co 250 ms.
- Pętla oparta na `requestAnimationFrame` aktualizuje ruch, klatkę animacji i widok również podczas postoju.
- Drzwi, trzy samochody oraz złożona kartka są obiektami interaktywnymi opisanymi przez dane: obszar kliknięcia, punkt podejścia, akcję i opis. Kliknięcie obiektu wyznacza trasę, a akcja wykonuje się dopiero po dotarciu. Samochody pokazują własne opisy; drzwi przełączają grę do wnętrza.
- Złożona kartka leży na chodniku i ma własną pikselową grafikę. Po dotarciu postaci znika ze sceny, jej obszar interakcji jest usuwany, a przedmiot trafia do prostego ekwipunku. Kliknięcie panelu ekwipunku pozwala przeczytać treść kartki.
- Przycisk `Debug` przełącza pomocniczy podgląd dostępnych obszarów, granic obiektów interaktywnych, punktu stóp, kierunku postaci i aktualnego punktu trasy.
- Dane konkretnej lokacji przy ul. Siennej zostały wydzielone do `src/locations/sienna.ts`. Moduł tworzy granice ruchu, drzwi i samochody, listę przedmiotów, komplet obiektów interaktywnych oraz początkową pozycję postaci. `main.ts` otrzymuje gotowy opis lokacji przez `createSiennaLocation()`.

### Wewnątrz — FPP

- Działają ruch do przodu, do tyłu i w bok oraz obroty o 90 stopni. Przemieszczanie jest możliwe tylko na pola `.`.
- Widok jest składany w ustalonej perspektywie. Ściany i brama korzystają z prostych figur; rysowane są także dalsze pola i pola po bokach.
- Tekstura nawierzchni jest rysowana na poszczególnych kafelkach podłogi w perspektywie. Odcienie `floorShades` są losowane raz przy uruchomieniu dla całej mapy i pozostają przypisane do pól podczas ruchu.
- Klucz ma grafikę i pozycję niezależną od danych mapy. Wejście na jego pole usuwa przedmiot z listy i ustawia `hasKey` postaci.
- Interakcja z bramą wymaga klucza. Otwarcie zmienia pole `G` na `.`, umożliwiając przejście. W obecnej wersji klucz nie jest zużywany.
- Wyświetlane są tekstowa minimapa, szczegóły gracza i komunikaty. Minimapę oraz szczegóły ukrywamy w trybie zewnętrznym. Panel ekwipunku i aktualny cel pozostają wspólnymi elementami interfejsu.

### Cel i prosty ekwipunek

- Początkowy cel brzmi: „Znajdź kartkę na chodniku”. Po zebraniu kartki zmienia się na wejście do budynku i znalezienie klucza, po znalezieniu klucza na otwarcie bramy, a po jej otwarciu zostaje oznaczony jako ukończony.
- Aktualny cel jest wyliczany z faktycznego stanu gry z priorytetem: otwarta brama, posiadany klucz, zebrana kartka, stan początkowy. Dzięki temu nietypowa kolejność działań, np. otwarcie bramy przed zebraniem kartki, nie cofa postępu celu.
- Ekwipunek zewnętrzny jest obecnie prostą tablicą zebranych `OutdoorItem`. Panel pokazuje nazwy przedmiotów; przy jednym przedmiocie kliknięcie panelu wyświetla jego `examineText`. Nie jest to jeszcze docelowy, wspólny ekwipunek dla obu trybów — klucz we wnętrzu nadal jest przechowywany jako `hasKey` postaci.

### Przechodzenie między trybami

- Kliknięcie drzwi na scenie zewnętrznej wyznacza punkt podejścia i zamiar wejścia. Przejście do FPP następuje dopiero po dotarciu. Kliknięcie innego punktu chodnika przed dojściem anuluje zamiar wejścia.
- Każde wejście ustawia pozycję we wnętrzu na `(1, 1)` i kierunek `E`, czyli wschód.
- Wyjście znajduje się na zachodnim końcu korytarza, na `(0, 1)`. Klawisz `F`, gdy gracz patrzy na to pole bezpośrednio przed sobą, przywraca scenę zewnętrzną.
- Podczas przejść zachowywane są pozycja postaci na zewnątrz, zebrana kartka i prosty ekwipunek, posiadanie klucza, usunięte przedmioty, stan bramy oraz wynikający z nich cel. Dane znajdują się w pamięci; odświeżenie strony rozpoczyna prototyp od nowa.

## Sterowanie

Na zewnątrz używamy kliknięć myszy. Klawiatura steruje postacią tylko we wnętrzu.

| Klawisz | Działanie we wnętrzu |
| --- | --- |
| `W` lub strzałka w górę | Ruch do przodu |
| `S` lub strzałka w dół | Ruch do tyłu |
| `A` / `D` | Ruch w bok, w lewo / w prawo |
| `Q` / `E` lub strzałki lewo / prawo | Obrót o 90 stopni |
| `F` | Interakcja z bramą lub wyjściem przed graczem |

## Obecna mapa testowa FPP

Mapa ma 30 × 4 pola i przedstawia prosty korytarz z krótką odnogą. Współrzędne liczymy od zera, od lewego górnego rogu. Dane w `src/map.ts` wyglądają tak:

```text
##############################
#..............G.............#
#####.########################
##############################
```

Legenda: `#` — ściana lub pole niedostępne, `.` — wolne pole, `G` — zamknięta brama. Pozycja gracza i przedmioty są przechowywane osobno.

- Klucz: `(5, 2)`, czyli w krótkiej odnodze od głównego korytarza.
- Brama: `(15, 1)`.
- Wyjście: `(0, 1)` — w danych mapy nadal jest to `#`; renderer pokazuje drzwi, a logika obsługuje interakcję z wyjściem.
- Obiekt `indoorPlayer` jest początkowo tworzony z pozycją `(4, 1)` i kierunkiem `N`. Gra startuje jednak na zewnątrz, a wejście do budynku nadpisuje te wartości pozycją `(1, 1)` i kierunkiem `E`.

## Grafika i materiały

Aktywne zasoby znajdują się w `src/assets/`:

| Zasób | Zastosowanie |
| --- | --- |
| `backgrounds/sienna-base-with-shadows.png` | Aktywne tło sceny zewnętrznej bez aut, z nawierzchnią i cieniami samochodów |
| `backgrounds/sienna-car-left.png` | Przezroczysta warstwa srebrnego samochodu |
| `backgrounds/sienna-car-center.png` | Przezroczysta warstwa zielonego samochodu |
| `backgrounds/sienna-car-right.png` | Przezroczysta warstwa czerwonego samochodu |
| `backgrounds/sienna.png` | Pierwotny złożony obraz sceny, zachowany jako materiał źródłowy i odniesienie |
| `characters/tommie-walk-right.png` | Arkusz animacji chodzenia postaci |
| `characters/tommie-walk-up.png` | Arkusz animacji chodzenia w górę sceny, z postacią widzianą od tyłu |
| `characters/tommie-walk-down.png` | Arkusz animacji chodzenia w dół sceny, z postacią widzianą od przodu |
| `characters/tommie-idle.png` | Arkusz animacji bezczynności postaci |
| `characters/tommie-idle-up.png` | Czteroklatkowa animacja bezczynności postaci skierowanej w górę sceny |
| `characters/tommie-idle-down.png` | Czteroklatkowa animacja bezczynności postaci skierowanej w dół sceny |
| `items/folded-note.png` | Grafika złożonej kartki zbieranej na scenie zewnętrznej |
| `textures/pavement.png` | Tekstura nawierzchni z kwadratowymi płytami, używana na podłodze FPP |
| `items/golden-key.png` | Grafika klucza w widoku FPP |

Arkusze postaci mają po jednym rzędzie klatek. Chód i postój bokiem używają sześciu klatek, a pionowe animacje bezczynności czterech. Towarzyszące pliki JSON opisują część zasobów, ale parametry odtwarzania i wycinania klatek nadal są zapisane w kodzie. Animacje powstały z użyciem PixelLab. Arkusze kierunkowe korzystają ze wspólnej kotwicy stóp `(72, 120)` i wysokości odniesienia 94 piksele. Pliki GIF dla kierunków góra i dół służą tylko jako podglądy, a nie jako zasoby wczytywane przez grę.

Pliki `backgrounds/sienna-base.png` oraz osobne notatki i prompty pozostają materiałami roboczymi. Aktywnym wariantem tła jest wersja z cieniami. Warstwy samochodów są ustawione we wspólnym układzie źródłowym 1672 × 941 i skalowane jednym współczynnikiem względem canvasu.

Rozmowy i obrazy referencyjne, m.in. `docs/ulica.png` oraz `docs/ulica2.png`, są materiałami pomocniczymi. Nie należy zakładać, że każdy materiał w `docs/` jest używany przez grę ani że inne zdjęcia z rozmów są dostępne w repozytorium. Dalszy sposób tworzenia otoczenia pozostaje otwarty; można nadal prototypować prostymi figurami bez czekania na nowe zdjęcia.

## Podział kodu po uporządkowaniu projektu

| Plik w `src/` | Odpowiedzialność |
| --- | --- |
| `main.ts` | Uruchomienie gry, stan obu trybów, prosty ekwipunek i cele, podłączenie zdarzeń, przejścia między lokacjami, wybór renderera i pętla animacji |
| `assets.ts` | Tworzenie i wczytywanie obrazów, w tym tła, samochodów, kierunkowych animacji postaci, kartki, klucza i nawierzchni, oraz obsługa zakończenia i błędów |
| `ui.ts` | Tworzenie HTML, pobieranie elementów interfejsu oraz prezentacja celu, ekwipunku, zebranych przedmiotów i szczegółów gracza |
| `player.ts` | Typy `IndoorPlayer` i `OutdoorPlayer`, obliczanie pozycji względnych, ruch, obroty oraz zbieranie przedmiotów |
| `controls.ts` | Przypisanie kodów klawiszy do akcji przez `getAction` |
| `indoor.ts` | Wykonywanie akcji FPP; zwraca zebrane przedmioty, komunikat, żądanie wyjścia i informację o otwarciu bramy, bez obsługi HTML |
| `outdoor.ts` | Ogólne typy i logika scen zewnętrznych: przedmioty, akcje `enter`/`inspect`/`collect`, tworzenie interaktywnych odpowiedników przedmiotów, interpretacja kliknięcia, sprawdzanie prostego odcinka oraz tworzenie trasy przez chodnik |
| `locations/sienna.ts` | Dane i składanie lokacji przy ul. Siennej: dostępny teren, drzwi, samochody, przedmioty, teksty, punkty podejścia i początkowa pozycja postaci |
| `geometry.ts` | Typ granic prostokąta i sprawdzanie, czy punkt znajduje się w jego obszarze |
| `renderer.ts` | Rysowanie sceny FPP |
| `outdoorRenderer.ts` | Rysowanie tła, kartki, celu debugowego, cienia, kierunkowej animacji postaci i warstw samochodów |
| `figures.ts` | Funkcje rysujące elementy widoku FPP, w tym kafelki podłogi, ściany, drzwi i klucz |
| `minimap.ts` | Tworzenie tekstowej minimapy |
| `map.ts` | Dane mapy FPP |
| `items.ts` | Typy i lista przedmiotów oraz sprawdzanie obecności klucza na polu |
| `interactions.ts` | Sprawdzanie i otwieranie bramy przed graczem |

Zakończono bieżący etap porządkowania kodu. Dalszy podział modułów warto rozważać przy konkretnych potrzebach nowych mechanik lub lokacji.

## Uruchamianie i ostatnia weryfikacja

Polecenia wykonujemy w folderze projektu:

| Polecenie | Cel |
| --- | --- |
| `npm run dev` | Uruchomienie serwera deweloperskiego Vite |
| `npm run build` | Sprawdzenie kodu przez TypeScript, następnie zbudowanie wersji produkcyjnej przez Vite |
| `npm run preview` | Lokalny podgląd wcześniej zbudowanej wersji |

Użytkownik potwierdził ręcznie działanie przechodzenia między samochodami, tras z punktami pośrednimi, czterech kierunków chodu i bezczynności, warstwowego zasłaniania, interakcji z drzwiami i trzema samochodami, zbierania i czytania kartki, panelu ekwipunku oraz całej sekwencji celów. Sprawdzono również nietypową kolejność: znalezienie klucza i otwarcie bramy przed zebraniem kartki nie cofa ukończonego celu. Po wydzieleniu danych lokacji Sienna i uogólnieniu tworzenia interakcji przedmiotów użytkownik ponownie uruchomił `npm run build`; sprawdzanie TypeScript i kompilacja Vite zakończyły się bez błędów.

## Proponowane następne kroki

Etap rozdzielenia tła i samochodów, chodzenia pomiędzy nimi, kierunkowych animacji, pierwszego przedmiotu, prostego ekwipunku, sekwencji celów oraz wydzielenia danych lokacji Sienna jest zakończony. Poniższe punkty są propozycjami, a nie wdrożonymi funkcjami ani zatwierdzonym szczegółowym rozwiązaniem:

1. Jeżeli pojawi się więcej przedmiotów, zastąpić kliknięcie całego panelu ekwipunku wyborem konkretnego przedmiotu i rozważyć wspólny model ekwipunku dla trybu zewnętrznego oraz FPP.
2. Obecne wyznaczanie drogi jest dopasowane do chodnika z dwiema odnogami. Bardziej złożone lokacje będą wymagały ogólniejszej reprezentacji dostępnego terenu i algorytmu wyszukiwania drogi.
3. Rozważyć zapis stanu gry, gdy odświeżenie strony przestanie być akceptowalnym resetem prototypu.
4. Po każdym małym kroku sprawdzać ruch, animacje, interakcje, cele i przejścia między trybami. Dalsze lokacje, fabuła, dźwięk i docelowa oprawa wnętrz pozostają do opracowania.

## Sposób współpracy

Obowiązują zasady z `AGENTS.md`: rozmowa po polsku, rola mentora i samodzielne pisanie kodu przez użytkownika. Każdy krok powinien mieć wyjaśniony cel i sposób sprawdzenia wyniku. Kod aplikacji można tworzyć lub zmieniać za użytkownika dopiero na jego wyraźną prośbę. Nie wykonuj konfiguracji ani nie instaluj zależności za użytkownika bez takiej prośby. Oddzielaj działający stan, wspólne decyzje i propozycje dalszych prac.
