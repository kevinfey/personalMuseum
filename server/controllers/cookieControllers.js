const cookieController = {};

/**
 * setCookie - set a cookie with a random number
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('Personal-Museum', 'Test-Cookie-Fresh-From-The-Oven');
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  const id = res.locals.id;
  res.cookie('SSID', id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
