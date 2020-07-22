const db = require('../models/artModels');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  let fortune = req.cookies.SSID;
  console.log('coookie monster', fortune);
  Session.findOne({ cookieId: fortune }, (err, data) => {
    if (err) {
      return next(err);
    } else if (!data) {
      res.redirect('/signup');
    } else {
      return next();
    }
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  // add a key value pair to session schhema with key beiing cookieid and value string ssid
  const id = res.locals.id;
  Session.create({ cookieId: id }, (err, data) => {
    if (err) return next(err);
    else return next();
  });
};

module.exports = sessionController;
