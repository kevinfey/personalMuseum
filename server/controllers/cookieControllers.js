const cookieController = {};

/**
 * setCookie - set a cookie with a random number
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('Cookie', 'Cookie From Kevin');
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
