# K2 - socket.io workshop

## Zadanie

Zadanie polega na przygotowanie prostego klienta czatowego. Wszystkie czaty komunikują sie z tym samym miejscem, wszyscy piszemy klienta powiązanego z tym samym serwerem. Docelowo na koniec powinniśmy móc wszyscy się ze sobą komunikować, każdy przy użyciu swojego klienta.
 
Zadanie ma cztery poziomy skomplikowania, w czasie warsztatów wystarczy zrobić punkty z pierwszej części, jednak jeśli starczy czasu lub nawet później dla samego siebie, zachęcam do zrobienia wszystkich częsci zadania. Będzie to dobre ćwieczenie na głębsze zrozumienie komunikacji socketowej.

### Wymagania

Program powinien spełniać następujące wymagania:

#### Część I - komunikacja podstawowa

* Strona umożliwia podanie nicku w celu zalogowania sie do czatu - bez podania nicku czat nie powinien umożliwiać pisania
* Czat pobiera prawidłowo wiadomości z serwera
* Czat umożliwia wysłanie wiadomości

#### Część II - komunikacja zaawansowana

* Czat po uruchomieniu/zalogowaniu wyświetla historię z wybraną przez siebie liczbą ostatnich wiadomości
* Czat wyświetla komunikaty serwerowe (dołaczenie nowego użytkownika itd.)

#### Część III - użytkownicy

* Czat wyświetla listę aktywnych użytkowników
* Czat na bieżąco wysyła do serwera informację o aktywności użytkownia w celu dołączenia go do listy aktywnych

#### Część IV - UI

* Czat wyświetla poprawnie emotikony
* Czat zawiera przycisk pozwalający wyświetlać dostępne emotikony i dodaje je do wiadomości 

## Paczka startowa

Pobrana paczka zawiera standardowy `front-end-boilerplate` rozbudowany o dołaczoną bibliotekę `socket.io` łączącą się z docelowym serwerem. Cała reszta jest do napisania po waszej stronie. Wygląd i UI nie jest istotne, ale celowo nie załączam żadnego, żeby nie sugerować jak powinno to wyglądać. Sugeruję użycia bootstrapa albo innego gotowca zapewniającego podstawowe komponenty.

## Instrukcja obsługi socketów

Całość składa się z dwóch rzeczy, których obsługi trzeba się nauczyć:

### Emitter

```js
socket.emit(EVENT_NAME, PARAMS);
```

Komunikacja klient -> serwer. Każdy emitter jako drugi parametr przyjmuje obiekt z parametrami. W tabelce znajdują sie parametry, które należy przesłać.

#### Dostępne emittery: ####

#### client-login ####

Metoda loguje i dodaje użytkownika do aktywnych na czacie.

|**nazwa parametru**|**typ**|**wartość do przekazania**|
|-------------------|-------|--------------------------|
|`user`|string|nick logującego się użytkownika|

#### client-message ####

Metoda wysyła wiadomość.

|**nazwa parametru**|**typ**|**wartość do przekazania**|
|-------------------|-------|--------------------------|
|`author`|string|nick autora, powinien być zgodny z loginem podanym przy logowaniu|
|`message`|string|treść wiadomości|

#### client-get-history ####

Metoda prosząca o wysyłkę historii czatu.

|**nazwa parametru**|**typ**|**wartość do przekazania**|
|-------------------|-------|--------------------------|
|`limit`|string|liczba ostatnich wiadomości, które chcemy otrzymać|

#### client-ping ####

Odświeżenie aktywności użytkownika - powinno być wysyłane do serwera co minimum 10 sekund.

|**nazwa parametru**|**typ**|**wartość do przekazania**|
|-------------------|-------|--------------------------|
|`user`|string|login użytkownika, którego aktywność chcemy odświeżyć, powinien być zgodny z loginem podanym przy logowaniu|

### Receiver ###

```js
socket.on(EVENT_NAME, fn(:PARAMS);
```

Komunikacja serwer -> klient. Każdy receiver jako drugi parametr przyjmuje funkcję wykonywaną po zdarzeniu. Dane zwracane do funkcji do zweryfikowania samemu ;)

#### Dostępne receivery: ####

#### server-login ####

Serwer zalogował użytkownika do czatu.

#### server-message ####

Wiadomość z serwera od użytkownika.

#### server-notice ####

Komunikat serwerowy - np. zalogowanie do czatu innego użytkownika.

#### users-list ####

Serwer regularnie zwraca listę aktywnych użytkowników.
