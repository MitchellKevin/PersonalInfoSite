# PersonalInfoSite
Personal Info
03/02
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

04/02
De tweede dag ging ik proberen deze nieuwe opgedane kennis toe te passen. Ik begon met zoeken waar ik mijn 3D modellen kon vinden, want het was te kort van tijd om blender te leren (:

De websites die ik heb gebruikt zijn de volgende websites, omdat deze als .glb files te downloaden waren;
https://sketchfab.com/3d-models
Graduation cap - Free 3D Model By Poly by Google
https://www.turbosquid.com/

Ik begon met de kennis toe te passen door snel een portfolio-achtig format aan te houden, om dit simpel te houden. Hierdoor kon ik me vooral focussen op de nieuwe technieken. 


Ik had geleerd:
Hoe ik met camera, lichten en de models moest positioneren
Geleerd met canvas te werken
Geleerd hoe ik de 3D objects moest importeren en kon aanroepen
Geleerd hoe ik de grote 3D objects kon comprimeren (https://convert3d.org/app/compress)

05/02
Ik begon vandaag met het maken van een nieuwe branch aan voor een nieuwe versie van de website. Had wat ideeën bedacht met als inspiratiebronnen;
BMW E30 M3
Company55
ArtPill
IDS BK - Case Studies - Outloud
Charlie's Organics
COSIMO digital
3D Cyber Desk
Jordan Delcros
Flight Path
Curated.Media

Ik wilde de objecten groter en ruimtelijker maken, door de canvas bg transparant te maken en een grotere te maken. Verder wilde ik geen simpele draai bewegen maken, maar meer interactiever en unieker. Mijn ideeen waren als volgt;
Sport, Tennis racket | Slag bewegen simuleren (mogelijk aan het einde met tennisbal), on scroll.
Passie, Audi (auto) | In scherm laten rijden, met dat de wielen draaien totdat volledig in scherm gerold, on scroll.
Als hero een miniatuur, cartoonish style poppetje van mij gebruiken en dat deze de gebruikers van de website welkom heet met een praatwolkje, on click.

Ik heb eerst gewerkt met de tennisracket, want die zit in de tweede sectie. De hero (eerste sectie) kon ik nog niet aan werken, want ik kon niet (kosteloos) vinden hoe ik dit kon laten maken. Duss… ik begon met de tweede sectie, de tennisracket. Ik haalde eerst al mijn code weg van de vormgeving van de eerste versie en begon weer vanaf scratch. Eerst maakte ik de canvas groter, met een transparant achtergrond. Toen ik het tennisracket het juiste formaat had begon het complexere deel, veel wiskunde ):



Uiteindelijk gebruikte ik een rotation calculator(Rotation Calculator | Articulated Robotics). Om de juiste waarden te krijgen. De volgende stap was een animatie maken op basis van startpunt en eindpunt van de xyz punten, maar bij het tennisracket had ik leuk bedacht dat het 0.0 punt zat op het uiteinden van de racket, maar natuurlijk niet en laten we het lekker complexer maken het zat in het midden… natuurlijk waarom ook niet. Nu moest ik dus mid-animatie ook ervoor zorgen dat hij niet alleen beweegt op de xyz assen voor de rotatie, maar van de positie en dit op scroll. Ik had dus een start waarden en een target waarden vastgesteld en op progressie van de scroll in de viewport worden afgestemd op een seamless animatie. 

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
