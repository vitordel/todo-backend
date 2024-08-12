const baseController = require('../controllers/baseController');

const authorize = roles => (req, res, next) => {
  if (!req.authenticated) {
    return baseController.unauthorized(res);
  }

  if (!roles) {
    return next();
  }

  const userPermissions = req.authenticated.permissoes;

  let isAllowed = false;

  roles.forEach(role => {
    if (userPermissions.find(userPermission => userPermission.nome === role)) {
      isAllowed = true;
    }
  });

  if (!isAllowed) {
    return baseController.unauthorized(res);
  }

  next();
};

module.exports = authorize;
