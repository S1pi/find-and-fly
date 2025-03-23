# FIND AND FLY PROJECT

# UUTTA ESITTELYN JÄLKEEN:

## INFOA:

Yritin saada sovelluksen toimimaan pilvessä mutta virtuaalikoneella jostain syystä tietokanta antoi jatkuvasti koodia 500.
En keksinyt mistä tuo ongelma johtui koska sama BUILDATTU versio toimi taas sitten omalla koneellani.
Tarkistin myös että .env tiedostoon laitetut tunnukset toimivat /phpmyadminissa ja niillä pääsi kirjautumaan
Reititys myös toimi koska pääsin apidokumentaatioon sekä osoite check palautti 200 ja vastauksena käytettävät polut

Tietokanta palautti tämmöisen stackin virheenä:

"stack": "Error\n at PromisePool.execute (/home/sipi/findandfly/backend/node_modules/mysql2/lib/promise/pool.js:54:22)\n at getDestinationListWithAllData (/home/sipi/findandfly/backend/modules/media-server/dist/modules/media-server/src/api/model/destinationsModel.js:60:47)\n at getAllDestinations (/home/sipi/findandfly/backend/modules/media-server/dist/modules/media-server/src/api/controller/destinationController.js:12:93)\n at Layer.handle [as handle_request] (/home/sipi/findandfly/backend/node_modules/express/lib/router/layer.js:95:5)\n at next (/home/sipi/findandfly/backend/node_modules/express/lib/router/route.js:149:13)\n at Route.dispatch (/home/sipi/findandfly/backend/node_modules/express/lib/router/route.js:119:3)\n at Layer.handle [as handle_request] (/home/sipi/findandfly/backend/node_modules/express/lib/router/layer.js:95:5)\n at /home/sipi/findandfly/backend/node_modules/express/lib/router/index.js:284:15\n at Function.process_params (/home/sipi/findandfly/backend/node_modules/express/lib/router/index.js:346:12)\n at next (/home/sipi/findandfly/backend/node_modules/express/lib/router/index.js:280:10)"

Front end toki löytyy pilvestä osoitteesta:
https://users.metropolia.fi/~miikavs/Find-And-Fly/

Toki siinä ei näy kuin etusivu ja se on liitetty localhostiin.
Sitä voi toki testata laittamalla pystyyn backendin omalle koneelle lokaalisti.
Lisäksi täytyy pystyttää tietokanta ja sinne käyttäjät. Tietokannan luontiscripti löytyy kansiosta backend>dbScripts>createdb

## Muutokset aikaisempaan verrattuna:

### Yleisesti:

- Kirjautumine/rekisteröinti
- Kaikki Matkakohteet tulevat tietokannasta home näytölle
- Matkakohteiden, arvostelujen ja matkakohteiden nähtävyyksien lisääminen
- Reititys eri polkujen/näyttöjen välillä + "Protected routes"
- Custom componetteja: Avatar, Dropdownlist ja CustomImageInput sekä muokattu custom buttonia
- Uusia tyyppejä lisätty sekä backendiä muokattu palauttamaan dataa vähän eri muodossa
- API Dokumentaatio luotu backendille

### Omat näytöt tai modaalit:

- Jokaiselle matkakohteelle aukeaa näyttö sitä vastaavalla datalla joka tulee tietokannasta
- Arvostelu näyttö aukeaa add review painikkeesta
- Erillinen yleinen Matkakohteen arvostelu näyttö jossa on mahdollisuus lisätä uusi matkakohde
- Uudelle matkakohteelle aukeaa modaali.
- Arvostelua klikkaamalla aukeaa modaali josta sitä voi tarkastella isompana
- Profiili sivu josta pääsee kirjautumaan ulos

## Muutokset osio loppuu!!

# Tietokannan kuvaus:

## Kuva tietokanta mallista:

![DATABASE_MODEL](screenshots/database.png)

# Tähän mennessä toteutettuja ominaisuuksia:

Backendiin tehty reiti kaikkiin ominaisuuksiin:

### File-server

Tallentaa kuvat serverille ja palauttaa responsena osoitteen ja muutetun file nimen

### Media-server

Hoitaa kaiken datan siirron ja tallennuksen tietokantaan;
Destinations: Hakee kaikki kohteet,
Categories: Sisältää kategoriat destinationeille (liitetty id:n avulla),
reviews: Tallentaa kaikki arvostelut destinationeista ja liittää ne toisiinsa,
sub_destinations: Voi tallentaa destinationin alle kyseisen kohteen ali nähtävyyksiä,
users: Perus käyttäjätiedot,
files: Voi tallentaa kuvat jotka liitetään target_type:n avulla tauluun sekä target_id:n avulla kyseisen taulun kohteeseen.

### Auth-server

Hoitaa käyttähäjän kirjautumisen sekä kaiken authentikointiin liittyvän

## IMPORTANT

# BACKEND

Just for future this is here:

If need to extend Express --> Request interface

### CONTENT:

create file: types>express>index.d.ts

declare module 'express-serve-static-core' {
interface Request {
userOrSomethingElse?: YourCustomTypeHere;
}
}

## tsconfig

{
"compilerOptions": {
"typeRoots": ["./types"]
}
}

typeRoots path depends on your folder structure and where tsconfig
and types folder is

Example: This project type folder is on root/shared/types and tsconfig on root/modules/auth-server/
