# PersonalInfoSite
## 03/02
Vandaag hebben we een introductie gehad over het komende semester. Verder hebben we onze eerste opdracht gekregen, behorend bij de introductie fase. Opdracht: Maak een website over jezelf. Eisen:
1 Pagina
Met persoonlijk bij de ontwerpen passen
Leerdoelen vermelden en jezelf introduceren
…

Na het horen van de eerste opdracht begon ik aan de brainstormfase, hier ging ik na wat ik erin wilde hebben over mezelf, welke technieken ik wilde leren en wat mijn leerdoelen zijn. Ik wilde wel iets nieuws doen, maar een website maken in C# was nog een beetje vroeg gezien ik nog pas net ben begonnen met mezelf erin te verdiepen, dus moest ik iets zoeken wat uitdagend was, maaarrr niet te uitdagend voor de 9 dagen tijdsduur. Ik koos dus om gebruik te maken van iets wat ik veel zie in moderne websites maar zelf nog nooit heb gebruikt. Tromgeroffel….. 3D Objecten. Ik ging onderzoekend kijken naar hoe dit doel waar gemaakt kon worden, uit mijn kleine onderzoek bleek dat Three.js en WebGL het best paste bij mijn context, kijkend naar mijn doelen en tijdsduur en bestaande kennis. Ik ging deze les dus vooral aan de slag met hoe deze technieken in elkaar zaten.

Dit waren mijn bronnen:
https://www.youtube.com/watch?v=DEeaT6FxEws&list=LL&index=4&t=838s
https://www.youtube.com/watch?v=Q7AOvWpIVHU
https://www.youtube.com/watch?v=rbIbvw6c53k&t=762s
https://www.youtube.com/watch?v=f-9LEoYYvE4

## 04/02
De tweede dag ging ik proberen deze nieuwe opgedane kennis toe te passen. Ik begon met zoeken waar ik mijn 3D modellen kon vinden, want het was te kort van tijd om blender te leren (:

De websites die ik heb gebruikt zijn de volgende websites, omdat deze als .glb files te downloaden waren;
https://sketchfab.com/3d-models
Graduation cap - Free 3D Model By Poly by Google
https://www.turbosquid.com/

Ik begon met de kennis toe te passen door snel een portfolio-achtig format aan te houden, om dit simpel te houden. Hierdoor kon ik me vooral focussen op de nieuwe technieken. 

<img width="596" height="332" alt="image" src="https://github.com/user-attachments/assets/bd66a1d4-a792-4eac-8584-9c19c12642ef" />


Ik had geleerd:
* Hoe ik met camera, lichten en de models moest positioneren
* Geleerd met canvas te werken
* Geleerd hoe ik de 3D objects moest importeren en kon aanroepen
* Geleerd hoe ik de grote 3D objects kon comprimeren (https://convert3d.org/app/compress)

## 05/02
Ik begon vandaag met het maken van een nieuwe branch aan voor een nieuwe versie van de website. Had wat ideeën bedacht met als inspiratiebronnen;
* BMW E30 M3
* Company55
* ArtPill
* IDS BK - Case Studies - Outloud
* Charlie's Organics
* COSIMO digital
* 3D Cyber Desk
* Jordan Delcros
* Flight Path
* Curated.Media

Ik wilde de objecten groter en ruimtelijker maken, door de canvas bg transparant te maken en een grotere te maken. Verder wilde ik geen simpele draai bewegen maken, maar meer interactiever en unieker. Mijn ideeen waren als volgt;
Sport, Tennis racket | Slag bewegen simuleren (mogelijk aan het einde met tennisbal), on scroll.
Passie, Audi (auto) | In scherm laten rijden, met dat de wielen draaien totdat volledig in scherm gerold, on scroll.
Als hero een miniatuur, cartoonish style poppetje van mij gebruiken en dat deze de gebruikers van de website welkom heet met een praatwolkje, on click.

Ik heb eerst gewerkt met de tennisracket, want die zit in de tweede sectie. De hero (eerste sectie) kon ik nog niet aan werken, want ik kon niet (kosteloos) vinden hoe ik dit kon laten maken. Duss… ik begon met de tweede sectie, de tennisracket. Ik haalde eerst al mijn code weg van de vormgeving van de eerste versie en begon weer vanaf scratch. Eerst maakte ik de canvas groter, met een transparant achtergrond. Toen ik het tennisracket het juiste formaat had begon het complexere deel, veel wiskunde ):

Het eerste wat me te doen stond op deze mooie donderdag was mijn idee visueel als schets uit te werken als een concept in Figma(zie rechts), hieronder staat de schets van de beweging gang

<img width="151" height="397" alt="image" src="https://github.com/user-attachments/assets/52e143f9-c84c-4a2d-8017-564b598c25af" />
<img width="587" height="446" alt="image" src="https://github.com/user-attachments/assets/ff22acbd-80e7-40d7-a75d-1ab05c64e1a8" />


Uiteindelijk gebruikte ik een rotation calculator(Rotation Calculator | Articulated Robotics). Om de juiste waarden te krijgen. De volgende stap was een animatie maken op basis van startpunt en eindpunt van de xyz punten, maar bij het tennisracket had ik leuk bedacht dat het 0.0 punt zat op het uiteinden van de racket, maar natuurlijk niet en laten we het lekker complexer maken het zat in het midden… natuurlijk waarom ook niet. Nu moest ik dus mid-animatie ook ervoor zorgen dat hij niet alleen beweegt op de xyz assen voor de rotatie, maar van de positie en dit op scroll. Ik had dus een start waarden en een target waarden vastgesteld en op progressie van de scroll in de viewport worden afgestemd op een seamless animatie. 

<img width="207" height="296" alt="image" src="https://github.com/user-attachments/assets/a67d40cf-55a7-4a4d-9d93-17a61d0186c4" />


Het volgende onderdeel was de auto het scherm in te laten rijden. Dit kostte niet veel extra tijd omdat het concept hetzelfde werkt alleen met andere waarden, maar dat was niet leuk genoeg. Ik wilde ook dat de wielen zouden ronddraaien totdat de auto in positie stond, dit had ik gedaan door te kijken opnieuw de progressie van de scroll en als hij op 100% (=1) komt, stoppen de wielen weer, simpeler dan dat kan bijna niet.

Verder aan het einde van de les, ongeveer de laatste 1 a 1.5 uur heb ik mijn readme ge-update. 



Checklist:
* Markdown update
* Figma design schets
* New website

Inspiratie:
https://www.awwwards.com/sites/concept-bmw-i-peachweb-builder
https://bmw.peachworlds.com/
https://company55.de/index.html
https://artpill.studio/
https://work.outloud.co/ids-bk
https://www.drinkcharlies.com/
https://experience.triplemalt.fr/fr
https://www.cosimodigital.com/
https://3dcyberroom.vercel.app/
https://jordan-delcros.com/
https://flightpath.mdxpreview.xyz/
https://www.curated.media/



3D models:
https://sketchfab.com/3d-models/holo-metaball-d7d18498c02c4d97be8a6245c26545f2
https://poly.pizza/m/4v0sRFH6PN9
https://www.turbosquid.com/Search/Index.cfm?keyword=organic&media_typeid=2


Compression:
https://convert3d.org/app/compress


3D models examples:
https://www.turbosquid.com/3d-models/digital-vintage-watch-2331531
https://www.turbosquid.com/3d-models/bowling-ball-1981604
https://www.fab.com/listings/4549cb8c-cfca-4c43-b5b2-108848d7356b

Leerdoelen:
1. Beter leren ontwerp met gebruik van 3D objecten, om een extra element te kunnen gebruiken, om websites unieker te maken en om meer ruimte te krijgen op een website.
2. Beter worden in animaties, meer wow factoor kunnnen vertonenen.
3. Meer conceptualiseren hoe gebruikers kunnen interacteren met de website, om de gebruiker het gevoel te geven dat zij bepalend zijn voor hoe de website reageert.

## 06/02
Doelen voor vandaag zijn:
* Vormgeving mooier maken
* Leerdoelen erin zetten
* Hero maken
* Zo’n on snap op de sections dus dat je er niet
* Alles gewoon wat cleaner maken
* Focussen op responsiveness



## 10/02
Nieuw concept: een monopoly speelbord, waarbij de straten thema’s zijn. De thema/straten bestaan uit;
Dieren - Schildpad | Hamster
Leerdoelen - Leerdoel 1 | Leerdoel 2 | Leerdoel 3
Sport - Hardlopen | Krachttraining | Voetbal
Studietraject - Technische Informatica | Bedrijfsrecht | CMD
Hobby - Fotografie | Investeren | Werken
Games - Poker / 21 | Yathzee | Monopoly
Muziek - Fav artist? | Fav genre?
Eten - Glutenallergie | Italiaanse Keuken

Benodigdheden:
* 2D speelbord met custom straten
* 2D custom kaarten
* 3D Pionnen
* 3D Dobbelstenen

PvE:
* Dobbelstenen moeten over het bord rollen en laten zien wat het aantal ogen zijn, het aantal ogen moet al bedacht zijn voor de worp.
* Dobbelstenen mogen niet van het boord af rollen
* Camera volgt de pion waarbij de positie van de zijkant van het bord is in een bepaalde hoek
* Het speelveld draait elke keer als de pion voorbij de kant gaat en draait dan weer correct.







Custom speelbord:
<img width="586" height="580" alt="image" src="https://github.com/user-attachments/assets/1b6c5f18-3773-4ddb-9a03-8a60dce6e508" />



Custom speelkaarten:
<img width="593" height="373" alt="image" src="https://github.com/user-attachments/assets/85b6ae3d-bb2b-4837-bd5d-2931b75ad70b" />


Concept:
<img width="593" height="328" alt="image" src="https://github.com/user-attachments/assets/b668669d-4d01-459b-a9ce-44ade1b967ed" />




Start screen(animated):
<img width="607" height="324" alt="image" src="https://github.com/user-attachments/assets/263a7e14-897c-4327-9be1-69b38ecc7a50" />

Start game screen:
<img width="610" height="286" alt="image" src="https://github.com/user-attachments/assets/2f3a15f8-3253-4224-83fb-77cf7638d7d4" />


## 11/02
TODO voor morgen:
* Pionnen werkend krijgen (2U)
* Board rotating werkend krijgen (30M)
* Kaarten met API inladen op als op het vak staat (25M)
* Stappen pion animeren(30M)
* Dobbelsteen logic maken(30M)
* Dobbelsteen laten rollen op het board(2U)
* Personal Cards toevoegen(1U)

TODO
* (Poppetje en dobbelstenen 3D objecten), 404 bij GLTFLoader
* Kleuren van de straten op kaartjes
* Text van de kaartjes uit API(2U)
* Maat van de stappen aanpassen
* Template van het bord fixen consistent euro of M teken en namen aanpassen(20M)
* Title van de kaartjes in de api toevoegen(5M)
* Readme update(1U)
* Light and Dark mode feature(30M)
* Text toevoegen bij lege vakjes(30 M)

Ik had heel lang problemen met de GLTFLoader, dit laat mijn glb files zien. Elke keer als ik het importeerde verdween mijn speelbord. Na een hele dag op verschillende manieren dit proberen te fixen als CDN, in mijn html en als normale import in .js. Niks werkte en heb ik ervoor gekozen om gewoon met three.js simpele vormen te gebruiken ipv mijn glb bestanden, het kreeg geen toegang tot de resources met een 404 error code en wist echt niet meer wat het probleem kon zijn, maar kon ook niet vast blijven zitten, want had nog een hoop te doen. Na het maken van de three.js objecten (meshes) ging ik de logic, animatie en de resultaten tonen van de dobbelstenen, nadat dit werkend was ging ik werken om een matrix te plaatsen over het bord zodat ik wist hoeveel elke stap was voor een nieuw vak, zodat de pion zich kon verplaatsen per vakje, nadat ik een matrix had gemaakt voor het speelbord had ik problemen dat de hoekpunten breder waren en het dus niet goed uitkwam. Ik gaf die hoeken een 1.5x waarde mee zodat het uitkwam. Daarna was de pion stappen te laten zetten over het bord hij zet 10 stappen en na die stappen neemt hij een bocht en dan weer na 10 weer een bocht en houd tegelijkertijd de huidige stap bij (currentTile). Ik wilde eerst het bord laten draaien bij elke bocht zodat de tegels goed zichtbaar bleven, maar als ik het speelbord bijv. 45 graden draaide, dan bleef het poppetje op de oude plek staan. Uiteindelijk kwam ik op een eureka moment, ik moet niet het bord draaien, maar de camera, ik had in de movePawn function gezet dat hij elke keer controleert op welke positie de pion staat en dat als hij tussen een bepaalde range zat de camera draaide naar zoveel graden. Nadat dit gefixed was kon ik de dobbelstenen met een knop gooien en liep de pion geanimeerd over het bord naar de juiste positie. De volgende stap was het speelkaart die info liet zien over mij. Ik had elke straat een ander onderwerp gegeven. Ik had de data in een API gezet en deze data gefetched en dynamisch laten wijzigen op een template speelkaart. Ook wilde ik dat de kaarten van de straten op het kaartje te zien waren, dit heb ik gedaan met een simpel if else statement. Verder wilde ik nog de API data van andere studenten gebruiken, maar ik kon nergens vinden waar de DB of API stond, ik vond alleen een bijna leeg bestand in een Teams folder met API in de naam. Wel heb ik een eigen API gebouwd van ongeveer 260 regels en gefetched, dus ik weet wel hoe het moet. 

Final Version(Dark):
<img width="1907" height="953" alt="image" src="https://github.com/user-attachments/assets/a2a69299-b0fd-471a-817e-ea1e9ae91970" />
<img width="1911" height="962" alt="image" src="https://github.com/user-attachments/assets/ecdb029e-e628-4a08-9585-e8f78f635dc9" />
<img width="1915" height="968" alt="image" src="https://github.com/user-attachments/assets/f11a2760-32bc-4ca7-bd5b-35f5f6d8ab0a" />

Ik kan niet alles hebben, ben heel erg tevreden met het resultaat en heb mezelf overtroffen.
