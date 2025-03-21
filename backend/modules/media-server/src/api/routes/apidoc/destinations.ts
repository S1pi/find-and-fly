/**
 * @api {get} /destinations/ Endpoint Check
 * @apiName DestinationEndpointCheck
 * @apiGroup Destinations
 * @apiDescription Palauttaa viestin, joka ohjaa käyttämään muita reittejä (esim. /create, /all, /byid/:id).
 *
 * @apiSuccess {String} message Tiedote, jossa kerrotaan käytettävissä olevista reiteistä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Check for /create, /all, /:id route"
 *     }
 */

/**
 * @api {get} /destinations/all Get All Destinations
 * @apiName GetAllDestinations
 * @apiGroup Destinations
 * @apiDescription Hakee kaikki määränpääkohteet. Vastauksena palautetaan lista kohteista.
 *
 * @apiSuccess {Object[]} destinations Lista kohteista, jossa kussakin objektissa on kohteen tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Destination name",
 *         "country": "Country name",
 *         "description": "Some description",
 *         "category_id": 2,
 *         "user_id": 3
 *       },
 *       ...
 *     ]
 */

/**
 * @api {get} /destinations/categories Get Categories
 * @apiName GetCategories
 * @apiGroup Destinations
 * @apiDescription Hakee määränpääkategorioiden listan.
 *
 * @apiSuccess {Object[]} categories Lista kategorioista.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Beaches"
 *       },
 *       {
 *         "id": 2,
 *         "name": "Mountains"
 *       }
 *     ]
 */

/**
 * @api {get} /destinations/byid/:id Get Destination by ID
 * @apiName GetDestinationById
 * @apiGroup Destinations
 * @apiDescription Hakee yksittäisen määränpään sen uniikin ID:n perusteella.
 *
 * @apiParam {Number} id Määränpään uniikki tunniste. Parametrin tulee olla numeerinen.
 *
 * @apiSuccess {Object} destination Määränpään tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Destination name",
 *       "country": "Country name",
 *       "description": "Some description",
 *       "category_id": 2,
 *       "user_id": 3
 *     }
 *
 * @apiError (400) BadRequest Virheellinen parametrin arvo, mikäli id ei ole numeerinen.
 */

/**
 * @api {post} /destinations/create Create Destination
 * @apiName CreateDestination
 * @apiGroup Destinations
 * @apiDescription Luo uuden määränpään. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus (esim. Bearer-token).
 *
 * @apiParam (Request Body) {String} name Määränpään nimi.
 * @apiParam (Request Body) {String} country Määränpään maa.
 * @apiParam (Request Body) {String} description Määränpään kuvaus.
 * @apiParam (Request Body) {Number} category_id Kategoria, johon määränpää kuuluu.
 *
 * @apiSuccess {String} message Viesti onnistuneesta luonnista.
 * @apiSuccess {Number} destination_id Luodun määränpään tunniste.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Destination created successfully",
 *       "destination_id": 1
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (400) ValidationError Virheelliset tai puuttuvat kentät.
 */

/**
 * @api {delete} /destinations/delete/:id Delete Destination
 * @apiName DeleteDestination
 * @apiGroup Destinations
 * @apiDescription Poistaa määränpään ID:n perusteella. Reitti vaatii, että käyttäjä on autentikoitu ja rooliltaan admin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam {Number} id Määränpään uniikki tunniste.
 *
 * @apiSuccess {Object} deletedDestination Tieto poistetusta määränpäästä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Destination deleted successfully",
 *       "destination_id": 1
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (403) Forbidden Vain admin-käyttäjä voi poistaa määränpään.
 * @apiError (400) ValidationError Virheelliset tai puuttuvat kentät.
 */
