/**
 * @api {get} /auth/ Endpoint Check
 * @apiName AuthEndpointCheck
 * @apiGroup Auth
 * @apiDescription Palauttaa viestin, joka ohjaa käyttämään /login ja /register reittejä.
 *
 * @apiSuccess {String} message Tiedote, jossa kerrotaan käytettävissä olevista reiteistä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Check for /login and /register routes"
 *     }
 */

/**
 * @api {post} /auth/login Login User
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiDescription Kirjaa käyttäjän sisään.
 *
 * @apiParam (Request Body) {String} username Käyttäjätunnus. Pitää olla vähintään 3 ja enintään 18 merkkiä.
 * @apiParam (Request Body) {String} password Salasana. Pitää olla vähintään 6 merkkiä.
 *
 * @apiSuccess {String} message Viesti onnistuneesta kirjautumisesta.
 * @apiSuccess {String} token JSON Web Token.
 * @apiSuccess {Object} user Käyttäjädata ilman salasanaa.
 * @apiSuccess {Number} user.id Käyttäjän uniikki tunniste.
 * @apiSuccess {String} user.username Käyttäjätunnus.
 * @apiSuccess {String} user.email Käyttäjän sähköpostiosoite.
 * @apiSuccess {String} user.role Käyttäjän rooli.
 * @apiSuccess {String} user.created_at Käyttäjän rekisteröintiaika.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login successful",
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *       "user": {
 *         "id": 1,
 *         "username": "johndoe",
 *         "email": "john@example.com",
 *         "role": "user",
 *         "created_at": "2021-10-01T12:34:56.000Z"
 *       }
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjänimi tai salasana on virheellinen.
 * @apiError (500) ServerError Palvelinvirhe.
 */

/**
 * @api {post} /auth/register Register User
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiDescription Rekisteröi uuden käyttäjän.
 *
 * @apiParam (Request Body) {String} username Käyttäjätunnus. Pitää olla vähintään 3 ja enintään 18 merkkiä ja sisältää vain kirjaimia, numeroita sekä alaviivoja.
 * @apiParam (Request Body) {String} password Salasana. Pitää olla vähintään 6 merkkiä ja sisältää vähintään yhden ison kirjaimen.
 * @apiParam (Request Body) {String} email Sähköpostiosoite.
 *
 * @apiSuccess {String} message Viesti onnistuneesta rekisteröinnistä.
 * @apiSuccess {Object} user Luodun käyttäjän tiedot ilman salasanaa.
 * @apiSuccess {Number} user.id Käyttäjän uniikki tunniste.
 * @apiSuccess {String} user.username Käyttäjätunnus.
 * @apiSuccess {String} user.email Käyttäjän sähköpostiosoite.
 * @apiSuccess {String} user.role Käyttäjän rooli.
 * @apiSuccess {String} user.created_at Käyttäjän rekisteröintiaika.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "User created successfully",
 *       "user": {
 *         "id": 2,
 *         "username": "janedoe",
 *         "email": "jane@example.com",
 *         "role": "user",
 *         "created_at": "2021-11-15T08:22:33.000Z"
 *       }
 *     }
 *
 * @apiError (400) ValidationError Käyttäjätunnus, salasana tai sähköposti ei täytä vaatimuksia tai on jo olemassa.
 * @apiError (500) ServerError Palvelinvirhe.
 */
