/**
 * @api {get} /reviews/ Endpoint Check
 * @apiName ReviewEndpointCheck
 * @apiGroup Reviews
 * @apiDescription Palauttaa viestin, joka ohjaa käyttämään muita reittejä (esim. /getall).
 *
 * @apiSuccess {String} message Tiedote, jossa kerrotaan käytettävissä olevista reiteistä.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Check for /getall route"
 *     }
 */

/**
 * @api {get} /reviews/getall Get All Reviews
 * @apiName GetAllReviews
 * @apiGroup Reviews
 * @apiDescription Hakee kaikki arvostelut. Vastauksena palautetaan lista arvosteluobjekteja, joissa näkyy mm. tykkäykset ja inhokit.
 *
 * @apiSuccess {Object[]} reviews Lista arvosteluista.
 * @apiSuccess {Number} reviews.id Arvostelun tunniste.
 * @apiSuccess {Number} reviews.user_id Käyttäjän tunniste.
 * @apiSuccess {Number} reviews.destination_id Kohteen tunniste.
 * @apiSuccess {Number} reviews.rating Annettu arvio.
 * @apiSuccess {String} reviews.trip_type Matkan tyyppi (solo, family, friends, couple, business, other).
 * @apiSuccess {String} reviews.comment Arvostelun kommentti.
 * @apiSuccess {Number} reviews.likes Määrä tykkäyksiä.
 * @apiSuccess {Number} reviews.dislikes Määrä inhokkeja.
 * @apiSuccess {String} reviews.created_at Arvostelun luontiaika.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "user_id": 2,
 *         "destination_id": 5,
 *         "rating": 4,
 *         "trip_type": "solo",
 *         "comment": "Great place!",
 *         "likes": 10,
 *         "dislikes": 2,
 *         "created_at": "2022-01-01T12:00:00Z"
 *       },
 *       ...
 *     ]
 */

/**
 * @api {get} /reviews/getall/byid/:id Get Reviews by Destination ID
 * @apiName GetReviewsByDestinationId
 * @apiGroup Reviews
 * @apiDescription Hakee kaikki arvostelut tietylle kohteelle sen uniikin tunnisteen avulla.
 *
 * @apiParam {Number} id Kohteen uniikki tunniste.
 *
 * @apiSuccess {Object[]} reviews Lista arvosteluista kyseiselle kohteelle.
 * @apiSuccess {Number} reviews.id Arvostelun tunniste.
 * @apiSuccess {Number} reviews.user_id Käyttäjän tunniste.
 * @apiSuccess {Number} reviews.destination_id Kohteen tunniste.
 * @apiSuccess {Number} reviews.rating Annettu arvio.
 * @apiSuccess {String} reviews.trip_type Matkan tyyppi.
 * @apiSuccess {String} reviews.comment Kommentti.
 * @apiSuccess {Number} reviews.likes Tykkäysten määrä.
 * @apiSuccess {Number} reviews.dislikes Inhokkien määrä.
 * @apiSuccess {String} reviews.created_at Luontiaika.
 * @apiSuccess {String} [reviews.username] Käyttäjänimi (jos palautetaan).
 * @apiSuccess {String} [reviews.profile_picture] Käyttäjän profiilikuvan URL (jos saatavilla).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "user_id": 2,
 *         "destination_id": 5,
 *         "rating": 4,
 *         "trip_type": "solo",
 *         "comment": "Great place!",
 *         "likes": 10,
 *         "dislikes": 2,
 *         "created_at": "2022-01-01T12:00:00Z",
 *         "username": "john_doe",
 *         "profile_picture": "http://localhost:3003/uploads/profile.jpg"
 *       },
 *       ...
 *     ]
 *
 * @apiError (400) BadRequest Kohteen id:n tulee olla numeerinen.
 */

/**
 * @api {get} /reviews/:id Get Review by ID
 * @apiName GetReviewById
 * @apiGroup Reviews
 * @apiDescription Hakee yksittäisen arvostelun sen uniikin tunnisteen perusteella.
 *
 * @apiParam {Number} id Arvostelun uniikki tunniste.
 *
 * @apiSuccess {Object} review Arvostelun tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "user_id": 2,
 *       "destination_id": 5,
 *       "rating": 4,
 *       "trip_type": "solo",
 *       "comment": "Great place!",
 *       "likes": 10,
 *       "dislikes": 2,
 *       "created_at": "2022-01-01T12:00:00Z"
 *     }
 *
 * @apiError (400) BadRequest Arvostelun id:n tulee olla numeerinen.
 */

/**
 * @api {post} /reviews/create Create Review
 * @apiName CreateReview
 * @apiGroup Reviews
 * @apiDescription Luo uuden arvostelun. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus (esim. Bearer-token).
 *
 * @apiParam (Request Body) {Number} destination_id Kohteen id, jolle arvostelu luodaan.
 * @apiParam (Request Body) {Number} rating Arvostelu, jonka tulee olla välillä 1-5.
 * @apiParam (Request Body) {String} trip_type Matkan tyyppi. Sallittuja arvoja ovat: solo, family, friends, couple, business, other.
 * @apiParam (Request Body) {String} comment Arvostelun kommentti.
 * @apiParam (Request Body) {Object} [file_data] Valinnainen tiedostotieto, mikäli liitetään tiedosto.
 * @apiParam (Request Body) {String} file_data.file_name Tiedoston nimi.
 * @apiParam (Request Body) {String} file_data.file_url Tiedoston URL.
 *
 * @apiSuccess {String} message Viesti onnistuneesta luonnista.
 * @apiSuccess {Number} review_id Luodun arvostelun tunniste.
 * @apiSuccess {Object} review Luodun arvostelun tiedot.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Review created successfully",
 *       "review_id": 1,
 *       "review": {
 *         "id": 1,
 *         "user_id": 2,
 *         "destination_id": 5,
 *         "rating": 4,
 *         "trip_type": "solo",
 *         "comment": "Great place!",
 *         "likes": 0,
 *         "dislikes": 0,
 *         "created_at": "2022-01-01T12:00:00Z"
 *       }
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (400) ValidationError Puuttuvat tai virheelliset kentät.
 * @apiError (500) ServerError Virhe arvostelun luonnissa tai tiedostotietojen lisäämisessä.
 */

/**
 * @api {delete} /reviews/:id Delete Review
 * @apiName DeleteReview
 * @apiGroup Reviews
 * @apiDescription Poistaa arvostelun sen uniikin tunnisteen perusteella. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam {Number} id Arvostelun uniikki tunniste.
 *
 * @apiSuccess {String} message Viesti onnistuneesta poistosta.
 * @apiSuccess {Number} review_id Poistetun arvostelun tunniste.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Review deleted successfully",
 *       "review_id": 1
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (403) Forbidden Käyttäjällä ei ole oikeutta poistaa kyseistä arvostelua.
 * @apiError (400) ValidationError Arvostelun id:n tulee olla numeerinen.
 */

/**
 * @api {post} /reviews/:id/like Like Review
 * @apiName LikeReview
 * @apiGroup Reviews
 * @apiDescription Lisää tykkäysreaktion arvosteluun. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam {Number} id Arvostelun uniikki tunniste.
 *
 * @apiSuccess {String} message Viesti onnistuneesta reaktion päivityksestä tai lisäyksestä.
 * @apiSuccess {String} reaction Lisätty reaktio (tässä "like").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Review reaction updated",
 *       "reaction": "like"
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (403) Forbidden Käyttäjä ei voi reagoida omaan arvosteluun tai on jo reagoinut samalla tavalla.
 * @apiError (400) ValidationError Arvostelun id:n tulee olla numeerinen.
 */

/**
 * @api {post} /reviews/:id/dislike Dislike Review
 * @apiName DislikeReview
 * @apiGroup Reviews
 * @apiDescription Lisää dislike reaktion arvosteluun. Reitti vaatii käyttäjän autentikoinnin.
 *
 * @apiHeader {String} Authorization Käyttäjän autentikointitunnus.
 *
 * @apiParam {Number} id Arvostelun uniikki tunniste.
 *
 * @apiSuccess {String} message Viesti onnistuneesta reaktion päivityksestä tai lisäyksestä.
 * @apiSuccess {String} reaction Lisätty reaktio (tässä "dislike").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Review reaction added",
 *       "reaction": "dislike"
 *     }
 *
 * @apiError (401) Unauthorized Käyttäjä ei ole autentikoitunut.
 * @apiError (403) Forbidden Käyttäjä ei voi reagoida omaan arvosteluun tai on jo reagoinut samalla tavalla.
 * @apiError (400) ValidationError Arvostelun id:n tulee olla numeerinen.
 */
