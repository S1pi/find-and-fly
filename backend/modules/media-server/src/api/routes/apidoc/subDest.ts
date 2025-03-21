/**
 * @api {get} /subdestinations/ Endpoint Check
 * @apiName SubDestinationEndpointCheck
 * @apiGroup SubDestinations
 * @apiDescription Palauttaa viestin, joka ohjaa käyttämään muita reittejä (esim. /all ja /:id).
 *
 * @apiSuccess {String} message Tiedote, jossa kerrotaan käytettävissä olevista reiteistä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Check for /all, /:id route"
 *     }
 */

/**
 * @api {get} /subdestinations/all Get All SubDestinations
 * @apiName GetAllSubDestinations
 * @apiGroup SubDestinations
 * @apiDescription Hakee kaikki alakohtaiset määränpääkohteet.
 *
 * @apiSuccess {Object[]} subdestinations Lista alakohtaisista määränpääkohteista.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "SubDestination Name",
 *         "description": "Kuvaus",
 *         "destination_id": 2,
 *         "rating": 4.5,
 *         "user_id": 3,
 *         "created_at": "2021-12-01T00:00:00Z",
 *         "file_name": "optional_file.jpg",
 *         "file_url": "http://localhost:3003/uploads/optional_file.jpg"
 *       },
 *       ...
 *     ]
 */

/**
 * @api {get} /subdestinations/bydestination/:id Get SubDestinations by Destination ID
 * @apiName GetSubDestinationsByDestinationId
 * @apiGroup SubDestinations
 * @apiDescription Hakee alakohtaiset määränpääkohteet pääkohteen ID:n perusteella.
 *
 * @apiParam {Number} id Pääkohteen uniikki tunniste. Parametrin tulee olla numeerinen.
 *
 * @apiSuccess {Object[]} subdestinations Lista alakohtaisista määränpääkohteista.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "SubDestination Name",
 *         "description": "Kuvaus",
 *         "destination_id": 2,
 *         "rating": 4.5,
 *         "user_id": 3,
 *         "created_at": "2021-12-01T00:00:00Z",
 *         "file_name": "optional_file.jpg",
 *         "file_url": "http://localhost:3003/uploads/optional_file.jpg"
 *       },
 *       ...
 *     ]
 */

/**
 * @api {get} /subdestinations/:id Get SubDestination by ID
 * @apiName GetSubDestinationById
 * @apiGroup SubDestinations
 * @apiDescription Hakee yksittäisen alakohtaisen määränpään sen uniikin ID:n perusteella.
 *
 * @apiParam {Number} id Alakohtaisen määränpään uniikki tunniste.
 *
 * @apiSuccess {Object} subdestination Alakohtaisen määränpään tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "SubDestination Name",
 *       "description": "Kuvaus",
 *       "destination_id": 2,
 *       "rating": 4.5,
 *       "user_id": 3,
 *       "created_at": "2021-12-01T00:00:00Z",
 *       "file_name": "optional_file.jpg",
 *       "file_url": "http://localhost:3003/uploads/optional_file.jpg"
 *     }
 *
 * @apiError (400) BadRequest Virheellinen parametrin arvo, mikäli id ei ole numeerinen.
 */

/**
 * @api {post} /subdestinations/create Create SubDestination
 * @apiName CreateSubDestination
 * @apiGroup SubDestinations
 * @apiDescription Luo uuden alakohtaisen määränpään. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus (esim. Bearer-token).
 *
 * @apiParam (Request Body) {String} name Alakohtaisen määränpään nimi.
 * @apiParam (Request Body) {String} description Alakohtaisen määränpään kuvaus.
 * @apiParam (Request Body) {Number} destination_id Pääkohteen tunniste, johon alakohtainen määränpää liittyy.
 * @apiParam (Request Body) {Number} rating Arvosana alakohtaiselle määränpääkohteelle.
 * @apiParam (Request Body) {Object} [file_data] Valinnainen tiedostotieto, mikäli liitetään tiedosto.
 * @apiParam (Request Body) {String} file_data.file_name Tiedoston nimi.
 * @apiParam (Request Body) {String} file_data.file_url Tiedoston URL.
 *
 * @apiSuccess {String} message Viesti onnistuneesta luonnista.
 * @apiSuccess {Number} subDestination_id Luodun alakohtaisen määränpään tunniste.
 * @apiSuccess {Object} destination Luodun alakohtaisen määränpään tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "SubDestination created successfully",
 *       "subDestination_id": 1,
 *       "destination": {
 *         "id": 1,
 *         "name": "SubDestination Name",
 *         "description": "Kuvaus",
 *         "destination_id": 2,
 *         "rating": 4.5,
 *         "user_id": 3,
 *         "created_at": "2021-12-01T00:00:00Z",
 *         "file_name": "optional_file.jpg",
 *         "file_url": "http://localhost:3003/uploads/optional_file.jpg"
 *       }
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (400) ValidationError Virheelliset tai puuttuvat kentät.
 * @apiError (500) ServerError Tiedoston tietojen lisäyksessä tapahtui virhe.
 */

/**
 * @api {delete} /subdestinations/delete/:id Delete SubDestination
 * @apiName DeleteSubDestination
 * @apiGroup SubDestinations
 * @apiDescription Poistaa alakohtaisen määränpään ID:n perusteella. Reitti vaatii käyttäjän autentikoinnin ja admin-oikeudet.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam {Number} id Alakohtaisen määränpään uniikki tunniste.
 *
 * @apiSuccess {Object} deletedSubDestination Tieto poistetusta alakohtaisesta määränpäästä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "SubDestination deleted successfully",
 *       "destination_id": 1
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (403) Forbidden Vain admin-käyttäjä voi poistaa alakohtaisia määränpäitä.
 * @apiError (400) ValidationError Virheelliset tai puuttuvat kentät.
 */
