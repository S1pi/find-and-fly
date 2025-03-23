/**
 * @api {get} /users/ Endpoint Check
 * @apiName UserEndpointCheck
 * @apiGroup Users
 * @apiDescription Palauttaa viestin, joka ohjaa käyttämään muita reittejä: /getbytoken, /getAll, /:id, /update, /delete.
 *
 * @apiSuccess {String} message Tiedote, jossa kerrotaan käytettävissä olevista reiteistä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "routes: /getbytoken, /getAll, /:id, /update, /delete"
 *     }
 */

/**
 * @api {get} /users/getbytoken Get User by Token
 * @apiName GetUserByToken
 * @apiGroup Users
 * @apiDescription Hakee kirjautuneen käyttäjän tiedot tokenin perusteella.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus (esim. Bearer-token).
 *
 * @apiSuccess {String} message Viesti onnistuneesta hausta.
 * @apiSuccess {Object} userData Käyttäjän tiedot.
 * @apiSuccess {Number} userData.id Käyttäjän uniikki tunniste.
 * @apiSuccess {String} userData.username Käyttäjätunnus.
 * @apiSuccess {String} userData.email Käyttäjän sähköpostiosoite.
 * @apiSuccess {String} userData.role Käyttäjän rooli.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User found by token",
 *       "userData": {
 *         "id": 1,
 *         "username": "johndoe",
 *         "email": "john@example.com",
 *         "role": "user"
 *       }
 *     }
 *
 * @apiError (404) NotFound Käyttäjää ei löydy.
 */

/**
 * @api {get} /users/getAll Get All Users
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiDescription Hakee kaikkien käyttäjien tiedot.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiSuccess {String} message Viesti, joka kertoo kaikkien käyttäjien löytymisestä.
 * @apiSuccess {Object[]} userList Lista käyttäjistä.
 * @apiSuccess {Number} userList.id Käyttäjän tunniste.
 * @apiSuccess {String} userList.username Käyttäjätunnus.
 * @apiSuccess {String} userList.email Käyttäjän sähköposti.
 * @apiSuccess {String} userList.role Käyttäjän rooli.
 * @apiSuccess {String} userList.created_at Käyttäjän rekisteröintiaika.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "All users: ",
 *       "userList": [
 *         {
 *           "id": 1,
 *           "username": "johndoe",
 *           "email": "john@example.com",
 *           "role": "user",
 *           "created_at": "2021-10-01T12:34:56.000Z"
 *         },
 *         ...
 *       ]
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 */

/**
 * @api {get} /users/:id Get User by ID
 * @apiName GetUserById
 * @apiGroup Users
 * @apiDescription Hakee tietyn käyttäjän tiedot ID:n perusteella.
 *
 * @apiParam {Number} id Käyttäjän uniikki tunniste.
 *
 * @apiSuccess {String} message Viesti, jossa ilmoitetaan käyttäjän löytymisestä.
 * @apiSuccess {Object} user Käyttäjän tiedot.
 * @apiSuccess {Number} user.id Käyttäjän tunniste.
 * @apiSuccess {String} user.username Käyttäjätunnus.
 * @apiSuccess {String} user.email Käyttäjän sähköposti.
 * @apiSuccess {String} user.role Käyttäjän rooli.
 * @apiSuccess {String} user.created_at Käyttäjän rekisteröintiaika.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Username: johndoe found: ",
 *       "user": {
 *         "id": 1,
 *         "username": "johndoe",
 *         "email": "john@example.com",
 *         "role": "user",
 *         "created_at": "2021-10-01T12:34:56.000Z"
 *       }
 *     }
 *
 * @apiError (400) BadRequest ID tulee olla numeerinen.
 */

/**
 * @api {put} /users/update Update User Data
 * @apiName UpdateUserData
 * @apiGroup Users
 * @apiDescription Päivittää kirjautuneen käyttäjän tietoja.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam (Request Body) {String} [username] Käyttäjätunnus. Pitää olla 3-20 merkkiä ja sisältää vain kirjaimia, numeroita ja alaviivoja.
 * @apiParam (Request Body) {String} [email] Sähköpostiosoite.
 * @apiParam (Request Body) {String} [password] Salasana. Pitää olla vähintään 6 merkkiä.
 *
 * @apiSuccess {String} message Viesti, joka ilmoittaa käyttäjätietojen muutoksesta.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Change user data"
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (400) ValidationError Virheelliset tai puuttuvat kentät.
 */

/**
 * @api {delete} /users/delete Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiDescription Poistaa kirjautuneen käyttäjän omat tiedot.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiSuccess {String} message Viesti onnistuneesta poistosta.
 * @apiSuccess {Number} user_id Poistetun käyttäjän tunniste.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User deleted (id): ",
 *       "user_id": 1
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (500) ServerError Virhe käyttäjän poistossa.
 */
