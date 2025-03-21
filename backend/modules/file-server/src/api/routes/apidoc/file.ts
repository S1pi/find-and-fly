/**
 * @api {post} /upload Upload File
 * @apiName UploadFile
 * @apiGroup FileServer
 * @apiDescription Lataa kuva-tiedosto palvelimelle. Endpoint vaatii käyttäjän autentikoinnin.
 *
 * @apiParam {File} file Ladata oleva tiedosto. Tiedoston tulee olla mukana form-data:ssa avaimella "file".
 *
 * @apiSuccess (201) {String} message Viesti, joka ilmoittaa onnistuneesta latauksesta.
 * @apiSuccess (201) {String} file_name Palvelimelle tallennettu tiedoston nimi.
 * @apiSuccess (201) {String} file_url URL, josta ladattu tiedosto on saatavilla.
 *
 * @apiError (400) InvalidFile Tiedosto puuttuu tai se ei ole kelvollinen (esim. väärä tiedostotyyppi).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "File uploaded",
 *       "file_name": "username-1597530000000.jpg",
 *       "file_url": "http://localhost:3003/uploads/username-1597530000000.jpg"
 *     }
 */

/**
 * @api {delete} /delete/:filename Delete File
 * @apiName DeleteFile
 * @apiGroup FileServer
 * @apiDescription Poistaa palvelimelta tiedoston annettua tiedostonimeä vastaavan tiedoston.
 *
 * @apiParam {String} filename Poistettavan tiedoston uniikki nimi.
 *
 * @apiSuccess (204) NoContent Tiedoston poistaminen onnistui.
 *
 * @apiError (404) NotFound Tiedostoa ei löytynyt.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 */
