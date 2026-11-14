# Projekt gry — Świdnica

Dokument startowy • wersja 0.1 • 10 października 2026
Nazwa robocza projektu: „Świdnica — survival dungeon crawler”. Tytuł gry pozostaje do ustalenia.
Status: koncepcja; bez rozpoczętej implementacji i bez gotowych zasobów.

## 1. Zasady współpracy — obowiązujące

Grzegorz samodzielnie pisze kod gry. Asystent nie implementuje gry ani nie dostarcza gotowego kodu z własnej inicjatywy. Pomaga w programowaniu dopiero na pytanie: wyjaśnia, daje wskazówki i analizuje przesłany kod. Gotowy kod podaje wyłącznie na wyraźną prośbę.

Asystent odpowiada za rozwijanie fabuły, dialogów, zadań, dokumentów świata, koncepcji poziomów oraz grafiki i oprawy dźwiękowej. Przygotowanie konkretnych plików audio zależy od dostępnych możliwości; nie należy przedstawiać opisu dźwięku jako gotowego nagrania.

Decyzje podejmujemy wspólnie. Ostateczny głos należy do Grzegorza. Nowe pomysły oznaczamy jako propozycje, dopóki nie zostaną przyjęte. Ten dokument jest punktem odniesienia do dalszej pracy.

## 2. Ustalone założenia gry

- Jednoosobowe RPG FPP typu dungeon crawler, z jedną sterowaną postacią zamiast drużyny czterech bohaterów.
- Inspiracja sposobem poruszania i pikselową grafiką Dungeon Mastera z Amigi.
- Ruch po siatce: do przodu, do tyłu i w bok. Obracanie o 90 stopni.
- Współczesna Świdnica: chodniki, ulice, parki i wybrane budynki.
- Współczesne wyposażenie zamiast magii i średniowiecznego uzbrojenia: kij baseballowy, piła łańcuchowa, nóż, kastet, maczeta, młotek, siekiera, butelki, kamienie i broń palna. Nie wszystkie przedmioty muszą trafić do prototypu.
- Pierwsza platforma: przeglądarka. Android jest możliwym późniejszym etapem, nie zobowiązaniem obecnej wersji.
- Inspiracja fabularna: Resident Evil i katastrofa w Raccoon City. Własne postacie, organizacje, wydarzenia i materiały graficzne.
- Bohater całkowicie fikcyjny, nie oparty na użytkowniku.

## 3. Przyjęta podstawa fabuły

Marek Wolski, 32 lata, technik serwisujący instalacje w budynkach. Od kilku lat mieszka w Świdnicy. Jest praktyczny i spostrzegawczy, zna podstawowe naprawy, ale nie ma wojskowego przygotowania. Do napraw potrzebuje odpowiednich narzędzi i części.

Wieczorem przyjeżdża na pilne zgłoszenie do fikcyjnego biurowca. Ochroniarz informuje o zaniku zasilania w piwnicy. Część pomieszczeń wynajmuje firma medyczna. Zwyczajne zlecenie zmienia się w zagrożenie: Marek słyszy uderzenia za zamkniętymi drzwiami. Po powrocie na parter zastaje puste stanowisko ochrony i rozbity telefon. System zabezpieczeń blokuje wyjście.

Pierwszy cel: wydostać się z budynku. Dopiero na ulicy bohater odkrywa, że kryzys obejmuje większą część miasta.

Młodszy brat Marka kilka dni wcześniej zgłosił się do płatnego badania medycznego. Teraz nie odbiera telefonu. Marek nie od razu łączy to z wydarzeniami w biurowcu. Poszukiwanie brata stanowi osobistą motywację.

Kolejne cele fabularne: przetrwać i znaleźć schronienie; odnaleźć brata; odkryć prawdę o badaniach i zdecydować, co zrobić z dowodami.

Marek jest jedyną sterowaną postacią. Spotkani ludzie mogą przekazywać informacje, handlować i przebywać w bezpiecznych miejscach, bez stałej drużyny.

## 4. Kierunki do rozwinięcia — jeszcze nie zamknięte decyzje

- Fikcyjna firma biotechnologiczna i eksperyment nad regeneracją tkanek jako źródło katastrofy; dokładny mechanizm zakażenia i nazwa firmy wymagają ustalenia.
- Miasto odcinane kordonem; sprzeczne komunikaty i próby ukrycia dowodów.
- Ograniczone zapasy, unikanie części starć, hałas przyciągający zagrożenie.
- Zdrowie, kondycja i udźwig jako możliwe podstawowe parametry.
- Walka w czasie rzeczywistym z czasem oczekiwania po ataku — propozycja, do potwierdzenia.
- Klucze, bezpieczniki, narzędzia i dokumenty odblokowujące przejścia oraz skróty.
- Rozpoznawalne miejsca Świdnicy z uproszczonym układem dopasowanym do siatki. Dokładne lokalizacje i mapy nie zostały wybrane ani zweryfikowane.
- Rozdzielona logika gry, rysowanie i sterowanie; technologia i sposób renderowania pozostają do wyboru przez Grzegorza przy wsparciu na jego pytania.

## 5. Proponowany pierwszy etap: wydostać się z biurowca

Mały wycinek: piwnica, parter i wyjście na ulicę. To aktualny kierunek otwarcia; zastępuje wcześniejszą propozycję rozpoczynania od powrotu do domu i sklepu.

Proponowany zakres pierwszej grywalnej wersji:

- Ruch po siatce i obroty o 90 stopni.
- Ściany, przejścia i jedne interaktywne drzwi.
- Podniesienie i użycie przedmiotu potrzebnego do opuszczenia budynku.
- Krótka wskazówka fabularna.
- Dopiero po działającej eksploracji: jeden przeciwnik i prosta walka.

Lista zasobów do późniejszego określenia: ściany, podłoga, sufit, drzwi, przedmioty, interfejs, przeciwnik, odgłosy kroków i drzwi oraz ambient budynku. Rozdzielczość, paleta, formaty i wymiary nie są jeszcze ustalone — należy uzgodnić je przed produkcją zasobów.

## 6. Plan dalszej pracy

1. Ustalić wygląd ekranu gry, skalę grafiki i sposób prezentacji perspektywy.
2. Rozrysować małą mapę pierwszego poziomu i kolejność zdarzeń.
3. Przygotować potrzebne materiały fabularne i pierwsze zasoby graficzne.
4. Grzegorz tworzy podstawę poruszania; asystent pomaga wyłącznie na pytania.
5. Stopniowo dodawać interakcje, ekwipunek, przeciwnika i dźwięk.
6. Ocenić grywalny fragment przed rozszerzeniem świata na miasto.

## 7. Rejestr ustaleń

2026-10-10: ustalono współczesną Świdnicę, pikselowe FPP, jedną postać i ruch po siatce z obrotami 90 stopni.
2026-10-10: wskazano Resident Evil i Raccoon City jako inspirację fabularną.
2026-10-10: zaakceptowano Marka Wolskiego oraz początek w biurowcu jako podstawę historii.
2026-10-10: uzgodniono podział pracy: Grzegorz programuje, asystent tworzy oprawę i fabułę oraz udziela pomocy programistycznej na pytanie.
2026-10-10: utworzono dokument startowy projektu. Nie utworzono kodu gry ani nie wybrano technologii.
